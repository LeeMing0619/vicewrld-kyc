import styled from 'styled-components'
import SocialIcon from '@/components/ViceHeader/UI/SocialIcon'

const Container = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 8px;
`

const Label = styled.span`
  margin-left: 8px;
`

const Input = styled.input`
  background: transparent;
  height: 32px;
  font-size: 0.75rem;
  width: auto;
  margin-left: 8px;
  border-radius: 4px;
  padding: 2px 8px;
`

const SocialLink = ({ type, handle, isEditingSocials, setValue }) => {
  return (
    <Container href={isEditingSocials ? null : `https://${type}.com/${handle}`}>
      <SocialIcon icon={type.toLowerCase()} />
      {isEditingSocials ? (
        <Input
          type="text"
          value={handle}
          placeholder={`Add your handle`}
          onChange={e => setValue(e.target.value)}
        />
      ) : (
        <Label>{handle}</Label>
      )}
    </Container>
  )
}

export default SocialLink
