import { Field, InputType, Publisher } from 'type-graphql'
import { IsEmail, Length, Matches } from 'class-validator'
import { Context } from '@/types'
import {
  Channel,
  Folder,
  FolderVisibility,
  Message,
  MessageType,
  Role,
  Server,
  ServerUser,
  ServerUserStatus,
  User,
  UserFolder
} from '@/entity'
import {
  createAccessToken,
  handleUnderscore,
  logger,
  ReorderUtils
} from '@/util'
import * as argon2 from 'argon2'
import { LoginResponse } from '@/resolver/user/mutations/LoginResponse'
import { GraphQLEmailAddress } from 'graphql-scalars'
import { usernameRegex } from '@/util/text/usernameRegex'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class CreateAccountInput {
  @Field()
  @Length(3, 20)
  @Matches(usernameRegex)
  username: string

  @Field(() => GraphQLEmailAddress, { nullable: true })
  @IsEmail()
  email?: string

  @Field()
  @Length(6)
  password: string

  @Field({ nullable: true })
  @Length(6)
  metamask: string
}

export async function createAccount(
  ctx: Context,
  { username, email, password, metamask }: CreateAccountInput,
  notifyMessageChanged: Publisher<ChangePayload>
): Promise<LoginResponse> {
  logger('createAccount')
  const { em, liveQueryStore } = ctx
  if (email) {
    email = email.toLowerCase()
    const foundEmail = await em.findOne(User, {
      email: { $ilike: handleUnderscore(email) },
      isDeleted: false
    })
    if (foundEmail) throw new Error('error.login.emailInUse')
  }

  const foundUsername = await em.findOne(User, {
    username: { $ilike: handleUnderscore(username) },
    isDeleted: false
  })
  if (foundUsername) throw new Error('error.login.usernameTaken')

  if (metamask) {
    const foundMetamask = await em.findOne(User, {
      metamask: { $ilike: handleUnderscore(metamask) },
      isDeleted: false
    })
    if (foundMetamask) throw new Error('error.login.metamaskTaken')
  }

  const passwordHash = await argon2.hash(password)

  const user = em.create(User, {
    username,
    passwordHash,
    lastLoginAt: new Date(),
    email,
    metamask
  })

  em.persist(
    em.create(UserFolder, {
      user,
      folder: em.create(Folder, {
        name: 'Favorites',
        owner: user,
        visibility: FolderVisibility.Private
      }),
      position: ReorderUtils.FIRST_POSITION
    })
  )

  em.persist(
    em.create(UserFolder, {
      user,
      folder: em.create(Folder, {
        name: 'Read Later',
        owner: user,
        visibility: FolderVisibility.Private
      }),
      position: ReorderUtils.positionAfter(ReorderUtils.FIRST_POSITION)
    })
  )

  await em.persistAndFlush(user)

  const viceServer = await em.findOne(Server, {
    name: 'Vicewrld',
    isDeleted: false
  })
  if (viceServer) {
    const defaultRole = await em.findOneOrFail(Role, {
      server: viceServer,
      isDefault: true
    })
    viceServer.userCount++
    await em.persistAndFlush([
      viceServer,
      em.create(ServerUser, {
        user,
        server: viceServer,
        status: ServerUserStatus.Joined,
        role: defaultRole
      })
    ])
    const defaultChannel = await em.findOne(Channel, {
      server: viceServer,
      isDefault: true
    })
    if (defaultChannel) {
      const message = em.create(Message, {
        type: MessageType.Join,
        author: user,
        channel: defaultChannel
      })
      await em.persistAndFlush(message)
      await notifyMessageChanged({ id: message.id, type: ChangeType.Added })
    }
  }

  const accessToken = createAccessToken(user)
  ctx.userId = user.id
  return {
    accessToken,
    user
  } as LoginResponse
}
