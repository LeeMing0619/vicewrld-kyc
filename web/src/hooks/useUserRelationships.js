import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { RelationshipStatus } from '@/graphql/hooks'

export const useUserRelationships = () => {
  const [user] = useCurrentUser()
  return {
    friends:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === RelationshipStatus.MutualFollow
      ) ?? [],
    blocking:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === RelationshipStatus.Blocking
      ) ?? [],
    blockedBy:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === RelationshipStatus.Blocked
      ) ?? [],
    following:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === RelationshipStatus.Following
      ) ?? [],
    followedBy:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === RelationshipStatus.FollowedBy
      ) ?? []
  }
}
