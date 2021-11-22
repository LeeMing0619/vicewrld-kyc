// @ts-nocheck
import React from 'react'
// import { Link, animateScroll as scroll } from 'react-scroll'
// import a from 'next/link'
import styled from 'styled-components'
import { uuid } from 'uuidv4'
import GlowingButton from './UI/GlowingButton'
// import { withRouter } from 'next/router'
import { deepBlue } from './colors'

// const { menuItems } = styles

const MenuLink = styled.a`
  transition: 0.3s ease-in-out;
  font-family: Mylodon, sans-serif;
  &:hover {
    color: white !important;
    text-shadow: 0 0 8px var(--main-color), 0 0 12px var(--main-color), 0 0 16px var(--main-color),
      0 0 32px var(--main-color), 0 0 48px var(--main-color), 0 0 45px var(--main-color), 0 0 36px var(--main-color);
    &::after {
      width: 100%;
      right: 0;
    }
  }
`

const MenuItemsContainer = styled.div`
  justify-content: space-around;
  width: 100%;
  display: flex;
  color: white;
  text-align: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  font-size: 1rem;
`

// const MenuItems = ({ setShowModal, menuLinks, router: { pathname } }) => {
const MenuItems = ({ setShowModal, menuLinks, router }) => {
  const isOnHome = false
  return (
    <MenuItemsContainer style={{ maxWidth: menuLinks.length * 128, marginRight: 16 }}>
      {menuLinks.map(({ name, url, smooth, offset, isButton }, i) =>
        smooth ? (
          !isOnHome ? (
            <MenuLink
              key={`menu-item-${uuid()}`}
              href={`/${url}`}
              style={{ pointer: 'cursor', fontFamily: 'Mylodon, sans-serif' }}
            >
              {name}
            </MenuLink>
          ) : (
            <MenuLink
              key={`menu-item-${uuid()}`}
              spy
              smooth
              offset={offset ?? -110}
              duration={500}
              href={url}
              style={{ pointer: 'cursor', fontFamily: 'Mylodon, sans-serif' }}
            >
              {name}
            </MenuLink>
          )
        ) : (
          <MenuLink key={`menu-item-${uuid()}`} href={url}>
            {isButton ? (
              <GlowingButton
                mainColor={deepBlue}
                style={{
                  height: 32,
                  width: 140,
                  margin: '0',
                  padding: 8,
                  color: 'white',
                  fontFamily: 'Mylodon, sans-serif',
                }}
              >
                {name}
              </GlowingButton>
            ) : (
              name
            )}
          </MenuLink>
        ),
      )}
    </MenuItemsContainer>
  )
}

export default MenuItems
