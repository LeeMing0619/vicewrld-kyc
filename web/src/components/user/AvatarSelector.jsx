import styled from 'styled-components'
import { IconChevronLeft } from '@/components/ui/icons/Icons'
import { mainColor } from '@/vars/colors'
import NeonPulsingBox from '../ViceHeader/UI/NeonPulsing/Box'
import { useWindowSize } from '../ViceHeader/hooks/useWindowSize'

const Container = styled.div``
const BackContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-top: 16px;
  :hover {
    color: ${mainColor};
  }
`
const BackIcon = styled(IconChevronLeft)`
  font-size: 1.5rem;
  margin-left: 8px;
  transition: 0.3s ease-in-out;
`
const BackText = styled.h2`
  transition: 0.3s ease-in-out;
`
const SelectBody = styled.div`
  min-height: 300px;
  padding-bottom: 16px;
`

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
  border-radius: 250px;
  @media screen and (max-width: 600px) {
    width: 64px;
    height: 64px;
  }
`

const AvatarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 32px;
`

const Title = styled.h1`
  text-align: center;
  margin: 16px 0;
`

const AvatarSelector = ({ setAvatarSelectorOpen, selectAvatar }) => {
  const goBack = () => setAvatarSelectorOpen(false)
  const { width } = useWindowSize()
  return (
    <Container>
      <BackContainer onClick={goBack}>
        <BackIcon />
        <BackText>Back</BackText>
      </BackContainer>
      <SelectBody>
        <Title>Select an Avatar</Title>
        <AvatarContainer>
          {new Array(8).fill(0).map((_, i) => (
            <NeonPulsingBox
              style={{ margin: 16 }}
              key={Date.now() * Math.random()}
              color={mainColor}
              width={width > 600 ? 80 : 64}
              height={width > 600 ? 80 : 64}
            >
              <Avatar
                onClick={() => selectAvatar(i + 1)}
                src={`https://vicewrld.com/img/vicewrld/avatars/vice-avatar-${
                  i + 1
                }.jpg`}
              />
            </NeonPulsingBox>
          ))}
        </AvatarContainer>
      </SelectBody>
    </Container>
  )
}

export default AvatarSelector
