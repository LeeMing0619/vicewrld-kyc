import { Field, InputType } from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { User } from '@/entity'
import { logger, uploadImageFileSingle } from '@/util'

@InputType()
export class ChangeUserBannerInput {
  @Field(() => GraphQLUpload, { nullable: true })
  bannerFile?: FileUpload
}

export async function changeUserBanner(
  { em, userId, liveQueryStore }: Context,
  { bannerFile }: ChangeUserBannerInput
): Promise<User> {
  logger('changeUserBanner')
  const user = await em.findOneOrFail(User, userId)
  em.assign(user, {
    bannerUrl: bannerFile
      ? await uploadImageFileSingle(bannerFile, { width: 256, height: 256 })
      : user.avatarUrl
  })
  await em.persistAndFlush(user)
  return user
}
