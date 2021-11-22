// @ts-nocheck

import styled from 'styled-components'

const Icon = styled.i`
  transition: color 0.2s ease-in-out;
  font-style: normal;
  color: var(--main-color);
  margin-right: 8px;

  :hover {
    color: var(--complimentary-color);
  }
`

const SocialIcon = ({ icon }) => {
  return <Icon className={`fab fa-${icon}`} />
}

export default SocialIcon
