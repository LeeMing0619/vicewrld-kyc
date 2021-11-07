import DataLoader from 'dataloader'
import { Relationship, RelationshipStatus, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { logger } from '@/util'

export const followersLoader = (em: EntityManager, currentUserId: string) => {
  const loader = new DataLoader<string, User[]>(async (userIds: string[]) => {
    logger('followersLoader', userIds)
    loader.clearAll()
    const rels = await em.find(Relationship, { owner: userIds }, ['user'], {
      lastMessageAt: 'DESC'
    })

    const followers = (
      await em.find(Relationship, {
        owner: userIds[0],
        status: RelationshipStatus.FollowedBy
      })
    ).map(rel => rel.user)

    const mutualFollows = (
      await em.find(Relationship, {
        owner: userIds[0],
        status: RelationshipStatus.MutualFollow
      })
    ).map(rel => rel.user)

    const map: Record<string, User[]> = {}
    userIds.forEach(userId => {
      map[userId] = rels
        .filter(
          rel =>
            followers.includes(rel.user) || mutualFollows.includes(rel.user)
        )
        .map(rel => rel.user)
    })
    return userIds.map(userId => map[userId])
  })
  return loader
}
