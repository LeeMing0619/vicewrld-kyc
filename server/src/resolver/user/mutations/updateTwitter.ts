import { Field, ID, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { User } from '@/entity'
import { logger } from '@/util'

@InputType()
export class UpdateTwitterInput {
  @Field(() => ID)
  userId: string

  @Field({ nullable: true })
  @Length(1, 100)
  newTwitter?: string
}

export async function updateTwitter(
  { em, userId: currentUserId }: Context,
  { userId, newTwitter }: UpdateTwitterInput
): Promise<boolean> {
  logger('updateTwitter')
  const user = await em.findOneOrFail(User, userId)
  if (userId === currentUserId) {
    user.twitter = newTwitter
    await em.persistAndFlush(user)
    return true
  } else {
    throw new Error('Can only update your own twitter')
  }
}
