import { useState, useEffect } from 'react'
import Particles from '@/components/Particles'
import GlowingButton from '@/components/ui/GlowingButton'
import NeonPulsingBox from '../ViceHeader/UI/NeonPulsing/Box'
import FadeIn from '@/components/ViceHeader/UI/Animation/FadeIn'
import Page from '@/components/ui/page/Page'
import ProfileHeader from './ProfileHeader'
import DefaultSocialLinks from '@/components/ViceHeader/UI/SocialLinks'

import { useDetailedUserQuery } from '@/graphql/hooks'
import { mainColor, secondaryColor } from '@/vars/colors'

import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import {
  useChangeUserBannerMutation,
  useChangeUserAvatarMutation,
  useUpdateBioMutation,
  useUpdateTwitterMutation,
  useUpdateInstagramMutation
} from '@/graphql/hooks'

import {
  Container,
  BannerSection,
  ProfilePicture,
  ProfileParts,
  Sidebar,
  Overlay,
  ProfileName,
  ProfilePosts,
  PulsingCherry,
  Bio,
  BioText,
  ComingSoon,
  SocialLinks,
  EditBanner,
  EditIcon,
  ActionOverlay,
  PhotoOverlay,
  BioTextEdit,
  Submit
} from './parts'

import SocialLink from './parts/SocialLink'

const index = ({ username }) => {
  const { data: userData } = useDetailedUserQuery({
    variables: { username }
  })

  const [isEditingBio, setIsEditingBio] = useState(false)
  const [isEditingSocials, setIsEditingSocials] = useState(false)

  const [updateBio] = useUpdateBioMutation()
  const [updateTwitter] = useUpdateTwitterMutation()
  const [updateInstagram] = useUpdateInstagramMutation()
  const [changeBanner] = useChangeUserBannerMutation()
  const [changeAvatar] = useChangeUserAvatarMutation()
  const [currentUser] = useCurrentUser()

  const avatarUrl = userData?.user?.avatarUrl
  const bannerUrl = userData?.user?.bannerUrl
  const [instagram, setInstagram] = useState(userData?.user?.instagram ?? '')
  const [twitter, setTwitter] = useState(userData?.user?.twitter ?? '')

  const [bio, setBio] = useState(userData?.user?.bio)
  const canEdit = username === currentUser?.username

  const noBioText = canEdit
    ? 'No bio set, why not write one to tell your fans a bit about you!'
    : 'This creator prefers to be mysterious and has not left a bio!'

  const [bioText, setBioText] = useState(bio)

  useEffect(() => {
    if (userData?.user) {
      const { user } = userData
      if (user?.bio) {
        setBio(userData.user.bio)
        setBioText(userData.user.bio)
      }
      if (user?.twitter) {
        setTwitter(user?.twitter ?? '')
      }
      if (user?.instagram) {
        setInstagram(user?.instagram ?? '')
      }
    }
  }, [userData])

  const updateBioText = () => {
    updateBio({
      variables: { input: { newBio: bioText, userId: currentUser.id } }
    })
    setBio(bioText)
    setIsEditingBio(false)
  }

  const saveUpdatedSocials = () => {
    updateTwitter({
      variables: { input: { newTwitter: twitter, userId: currentUser.id } }
    })
    updateInstagram({
      variables: { input: { newInstagram: instagram, userId: currentUser.id } }
    })
    setIsEditingSocials(false)
  }

  const BannerWrapper = ({ children }) =>
    canEdit ? (
      <ActionOverlay htmlFor="bannerFile">{children}</ActionOverlay>
    ) : (
      <>{children}</>
    )

  const ProfilePictureWrapper = ({ children }) =>
    canEdit ? (
      <PhotoOverlay htmlFor="avatarFile">{children}</PhotoOverlay>
    ) : (
      <>{children}</>
    )

  return (
    <Page
      header={
        <ProfileHeader title={username} style={{ width: '100vw', flex: 1 }} />
      }
      rightSidebar={null}
    >
      <Container>
        <BannerSection
          canEdit={canEdit}
          bgImage={
            bannerUrl ??
            'https://www.vicewrld.com/img/vicewrld/para-bg-vice-shop.jpg'
          }
        >
          <BannerWrapper>
            <Overlay />
          </BannerWrapper>
          <ProfileName isBanner>{username}</ProfileName>
          {canEdit && (
            <>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                name="bannerFile"
                id="bannerFile"
                hidden
                onChange={e => {
                  const bannerFile = e.target.files[0]
                  if (!bannerFile) return
                  changeBanner({ variables: { input: { bannerFile } } })
                }}
              />
              <EditBanner>
                <EditIcon className={`fas fa-camera`} />
              </EditBanner>
            </>
          )}
        </BannerSection>
        <ProfilePictureWrapper>
          {canEdit && (
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              name="avatarFile"
              id="avatarFile"
              hidden
              onChange={e => {
                const avatarFile = e.target.files[0]
                if (!avatarFile) return
                changeAvatar({ variables: { input: { avatarFile } } })
              }}
            />
          )}
          <ProfilePicture
            src={avatarUrl ?? ''}
            alt={`profile-pic-${username}`}
            height={192}
            width={192}
            color={mainColor}
          />
          <EditBanner>
            <EditIcon fixBottom className={`fas fa-camera`} />
          </EditBanner>
        </ProfilePictureWrapper>
        <ProfileParts>
          <Sidebar>
            <Bio>
              <BioText
                canEdit={canEdit}
                onClick={() =>
                  canEdit && !isEditingBio && setIsEditingBio(true)
                }
              >
                <ProfileName>{username}</ProfileName>
                {isEditingBio ? (
                  <>
                    <BioTextEdit
                      value={bioText}
                      onChange={e => setBioText(e.target.value)}
                    />
                    <Submit bgColor={mainColor} onClick={updateBioText}>
                      save bio
                    </Submit>
                  </>
                ) : (
                  bio ?? noBioText
                )}
                {canEdit && !isEditingBio && (
                  <EditIcon
                    className={`fas fa-edit`}
                    style={{ marginLeft: 8 }}
                  />
                )}
              </BioText>
            </Bio>
            <SocialLinks>
              {(twitter !== '' ||
                twitter !== null ||
                twitter !== undefined ||
                canEdit) && (
                <SocialLink
                  type="twitter"
                  handle={twitter}
                  setValue={setTwitter}
                  isEditingSocials={isEditingSocials}
                />
              )}
              {(instagram !== '' ||
                instagram !== null ||
                instagram !== undefined ||
                canEdit) && (
                <SocialLink
                  type="instagram"
                  handle={instagram}
                  setValue={setInstagram}
                  isEditingSocials={isEditingSocials}
                />
              )}
              {canEdit && (
                <Submit
                  bgColor={mainColor}
                  onClick={() =>
                    isEditingSocials
                      ? saveUpdatedSocials()
                      : setIsEditingSocials(true)
                  }
                  small
                >
                  {isEditingSocials ? 'Update' : 'Edit'} Socials
                </Submit>
              )}
            </SocialLinks>
          </Sidebar>
          <ProfilePosts>
            <PulsingCherry
              alt="cherry"
              src="/images/vice/cherry-logo.png"
              className={`object-contain animate-pulse select-none pointer-events-none`}
            />
            <ComingSoon>
              Profile feeds
              <br />
              coming soon!
            </ComingSoon>
          </ProfilePosts>
        </ProfileParts>
      </Container>
    </Page>
  )
}

export default index
