import { Field, InputType } from 'type-graphql'
import { Context } from '@/types'
import { User } from '@/entity'
import { logger } from '@/util'

@InputType()
export class ChangeUserAvatarWithUrlInput {
  @Field()
  newAvatarUrl?: string
}

export async function changeUserAvatarWithUrl(
  { em, userId }: Context,
  { newAvatarUrl }: ChangeUserAvatarWithUrlInput
): Promise<User> {
  logger('changeUserAvatarWithUrl')
  const user = await em.findOneOrFail(User, userId)
  em.assign(user, {
    avatarUrl: newAvatarUrl
  })
  await em.persistAndFlush(user)
  return user
}
