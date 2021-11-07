// @ts-nocheck
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import SocialIcon from './SocialIcon'

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 300px;
`

const SocialLinkItem = styled.li`
  margin: auto 8px;
  list-style: none;
`

const SocialLinks = ({ style = {}, links = null }) => {
  const [socialLinks, setSocialLinks] = useState(
    links ?? [
      {
        url: 'https://t.me/VICEWRLD_TOKEN',
        type: 'Telegram'
      },
      {
        url: 'https://www.facebook.com/vicewrld.token',
        type: 'Facebook'
      },
      {
        url: 'http://twitter.com/Vicewrld_',
        type: 'Twitter'
      },
      {
        url: 'https://www.reddit.com/r/VICEWRLD_IO',
        type: 'Reddit'
      }
    ]
  )

  return (
    <SocialLinksContainer style={{ ...style }}>
      {socialLinks.map((item, i) => {
        return (
          <SocialLinkItem
            key={`social-links-${new Date().getTime() * Math.random()}`}
          >
            <a href={item.url} target="_blank" rel="noreferrer">
              <SocialIcon icon={item.type.toLowerCase()} />
            </a>
          </SocialLinkItem>
        )
      })}
    </SocialLinksContainer>
  )
}

export default SocialLinks
