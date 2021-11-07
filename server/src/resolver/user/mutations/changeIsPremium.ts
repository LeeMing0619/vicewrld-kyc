import { User } from '@/entity'
import { Context } from '@/types'
import { logger } from '@/util'

export async function changeIsPremium(
  { em, userId }: Context,
  isPremium: boolean
): Promise<User> {
  logger('changeIsPremium input?', isPremium)
  const user = await em.findOneOrFail(User, userId)
  user.isPremium = isPremium
  await em.persistAndFlush(user)
  return user
}
