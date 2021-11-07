import { Field, ID, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { User } from '@/entity'
import { logger } from '@/util'

@InputType()
export class UpdateBioInput {
  @Field(() => ID)
  userId: string

  @Field({ nullable: true })
  @Length(1, 3000)
  newBio?: string
}

export async function updateBio(
  { em, userId: currentUserId }: Context,
  { userId, newBio }: UpdateBioInput
): Promise<boolean> {
  logger('updateBio')
  const user = await em.findOneOrFail(User, userId)
  if (userId === currentUserId) {
    user.bio = newBio
    await em.persistAndFlush(user)
    return true
  } else {
    throw new Error('Can only update your own bio')
  }
}
