import { registerEnumType } from 'type-graphql'

export enum RelationshipStatus {
  None = 'None',
  Following = 'Following',
  FollowedBy = 'FollowedBy',
  MutualFollow = 'MutualFollow',
  Blocking = 'Blocking',
  Blocked = 'Blocked'
}

registerEnumType(RelationshipStatus, { name: 'RelationshipStatus' })
