import { User } from '@/entity'
import { Context } from '@/types'
import { logger } from '@/util'

export async function changeIsCreator(
  { em, userId }: Context,
  isCreator: Boolean
): Promise<User> {
  const user = await em.findOneOrFail(User, userId)
  console.log(isCreator, 'is creator')
  user.isCreator = new Boolean(isCreator).valueOf()
  await em.persistAndFlush(user)
  return user
}
