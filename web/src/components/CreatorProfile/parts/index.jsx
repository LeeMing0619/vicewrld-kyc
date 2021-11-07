import styled, { css } from 'styled-components'
import { NeonPulsingBorder } from '@/components/ViceHeader/UI/NeonPulsing/Image'

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background-color: #121212;
  position: relative;
  overflow-y: scroll;
`

export const BannerSection = styled.div`
  min-height: 192px;
  width: 100%;
  background-color: pink;
  display: flex;
  position: relative;
  flex: 1;
  max-height: 192px;
  justify-content: flex-start;
  align-items: flex-end;
  background-image: url('${({ bgImage }) => bgImage}');
  background-position: center;
  background-size: cover;
  position: relative;
  ${({ canEdit }) =>
    canEdit &&
    css`
      :hover {
        cursor: pointer;
        i {
          opacity: 1;
        }
      }
    `}
`

export const ProfilePicture = styled(NeonPulsingBorder)`
  height: 192px;
  width: 192px;
  position: absolute;
  border-radius: 250px;
  margin-left: 32px;
  top: 96px;
  z-index: 2;
  @media screen and (max-width: 600px) {
    height: 128px;
    width: 128px;
    top: 128px;
    align-self: center;
    margin-left: 0;
    margin-top: 0px;
  }
`

export const ProfileParts = styled.div`
  display: grid;
  flex: 1;
  width: 100%;
  grid-template-columns: 256px 1fr;
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`

export const Sidebar = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #0f0f0f;
  position: relative;
  z-index: 0;
  padding: 128px 32px;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  @media screen and (max-width: 600px) {
    padding-bottom: 96px;
  }
`

export const Overlay = styled.div`
  height: 192px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 0;
`

export const ProfileName = styled.span`
  z-index: 2;
  margin-left: 256px;
  font-size: 2rem;
  font-family: Mylodon;
  display: ${({ isBanner }) => (!isBanner ? 'none' : 'block')};
  @media screen and (max-width: 600px) {
    display: ${({ isBanner }) => (isBanner ? 'none' : 'block')};
    margin-left: auto;
    margin-bottom: 32px;
    margin-top: -32px;
    text-align: center;
    font-size: 1rem;
  }
`

export const ProfilePosts = styled.div`
  overflow: scroll;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #0f0f0f;
  @media screen and (max-width: 600px) {
    min-height: 400px;
  }
`

export const PulsingCherry = styled.img`
  height: 160px;
  width: 160px;
`

export const Bio = styled.div`
  @media screen and (max-width: 600px) {
    width: 100%;
    /* align-items: center; */
    /* display: flex; */
    height: 100%;
  }
`

export const BioText = styled.p`
  font-size: 0.85rem;
  :hover {
    ${({ canEdit }) =>
      canEdit &&
      css`
        cursor: pointer;
      `}
    i {
      opacity: 1;
    }
  }
  @media screen and (max-width: 600px) {
    text-align: center;
  }
`

export const BioTextEdit = styled.textarea`
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  background: transparent;
  color: white;
  height: 100%;
  min-height: 200px;
  flex: 1;
  width: 100%;
  font-size: 0.85rem;
  line-height: 1.25;
  margin: 0 -8px;
  padding: 4px;
`

export const Submit = styled.button`
  padding: 4px 8px;
  margin-top: 32px;
  background-color: ${({ bgColor }) => bgColor};
  transition: 0.3s ease-in-out;
  border-radius: 4px;
  margin: 16px auto;
  align-self: center;
  justify-self: center;
  ${({ small }) =>
    small &&
    css`
      font-size: 0.75rem;
      padding: 4px 16px;
    `}
  :hover {
    filter: hue-rotate(-45deg);
  }
`

export const ComingSoon = styled.h3`
  font-size: 1rem;
  margin-top: 16px;
  text-align: center;
`

export const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 64px; */
  position: absolute;
  bottom: 16px;
  align-self: center;
  justify-self: center;
  @media screen and (max-width: 600px) {
    width: calc(100% - 64px);
  }
`

export const EditBanner = styled.div`
  align-self: flex-end;
  justify-self: flex-end;
  position: absolute;
  right: 16px;
  bottom: 8px;
`

export const EditIcon = styled.i`
  color: white;
  transition: 0.3s ease-in-out;
  font-size: 16px;
  opacity: 0;
  z-index: 1;
  pointer-events: none;
  ${({ fixBottom }) =>
    fixBottom &&
    css`
      position: absolute;
      z-index: 10;
      right: 40px;
      top: 0px;
      color: #aaa;

      @media screen and (max-width: 600px) {
        right: 40px;
        top: 64px;
      }
    `}
`

export const ActionOverlay = styled.label`
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  flex: 1;
  z-index: 2;
  :hover {
    cursor: pointer;
  }
`

export const PhotoOverlay = styled.label`
  height: 192px;
  width: 192px;
  position: absolute;
  border-radius: 250px;
  z-index: 2;
  :hover {
    cursor: pointer;
    i {
      opacity: 1;
    }
  }
  @media screen and (max-width: 600px) {
    height: 128px;
    width: 128px;
    align-self: center;
  }
`
