import { Field, ID, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { User } from '@/entity'
import { logger } from '@/util'

@InputType()
export class UpdateInstagramInput {
  @Field(() => ID)
  userId: string

  @Field({ nullable: true })
  @Length(1, 100)
  newInstagram?: string
}

export async function updateInstagram(
  { em, userId: currentUserId }: Context,
  { userId, newInstagram }: UpdateInstagramInput
): Promise<boolean> {
  logger('updateInstagram')
  const user = await em.findOneOrFail(User, userId)
  if (userId === currentUserId) {
    user.instagram = newInstagram
    await em.persistAndFlush(user)
    return true
  } else {
    throw new Error('Can only update your own Instagram')
  }
}
