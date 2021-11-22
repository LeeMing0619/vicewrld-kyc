// @ts-nocheck
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import MenuItems from './MenuItems'
import FixedWidth from './UI/FixedWidth'
import TurkeyBurger from './UI/TurkeyBurger'
import { useWindowSize } from './hooks/useWindowSize'
import NeonImage from './UI/NeonPulsing/Image'

import { mainColor } from './colors'

const menuLinks = [
  {
    name: 'About',
    url: 'https://vicewrld.com/#about',
    smooth: false,
    isButton: false
  },
  {
    name: 'Team',
    url: 'https://vicewrld.com/#team',
    smooth: false,
    isButton: false
  },
  {
    name: 'Roadmap',
    url: 'https://vicewrld.com/#roadmap',
    smooth: false,
    isButton: false
  },
  {
    name: 'Whitepaper',
    url: 'https://vicewrld.com/#documents',
    smooth: false,
    isButton: false
  },
  {
    name: 'Vice Dolls',
    url: 'https://vicewrld.com/vice-dolls',
    smooth: false,
    isButton: false
  },
  {
    name: 'Contact Us',
    url: 'https://vicewrld.com/#contact',
    smooth: false,
    isButton: true
  }
]

const HeaderContainer = styled.div`
  width: 100vw;
  flex-direction: row;
  background-color: transparent;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  height: 100%;
  align-items: center;
  z-index: 9999;
  max-height: ${({ scrollPosition }) =>
    scrollPosition > 32 ? '78px' : '156px'};
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  @media screen and (max-width: 1200px) {
    margin-left: 16px;
  }
`

const Logo = styled(NeonImage)`
  margin-left: ${({ logoOffset }) => logoOffset}px!important;
`

const Outer = styled.header`
  position: fixed;
  left: 0;
  /* top: 64px; */
  top: 0px;
  z-index: 22;
  width: 100vw;
  height: 100%;
  max-height: 78px;
  transition: all 0.3s ease-in-out;
  background-color: ${({ isSmall }) =>
    isSmall ? 'var(--background-color-2)' : 'transparent'};
`

const Header = ({ setShowModal }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { width } = useWindowSize()
  const [isSmall, setIsSmall] = useState(true)

  const scrollPosition = useState(0)
  // const handleScroll = () => {
  //   setScrollPosition(window.scrollY)
  // }

  // useEffect(() => {
  //   document.addEventListener('scroll', handleScroll)
  //   return () => document.removeEventListener('scroll', handleScroll)
  // }, [])

  const toggleMenuActive = () => setMenuOpen(p => !p)
  const logoOffset = 0

  // useEffect(() => {
  //   setIsSmall(scrollPosition > 16)
  // }, [scrollPosition])

  return (
    <Outer isSmall={isSmall}>
      <HeaderContainer scrollPosition={scrollPosition} isSmall>
        <FixedWidth>
          <motion.div
            style={{ transformOrigin: 'center left', cursor: 'pointer' }}
            initial="small"
            animate={!isSmall ? 'large' : 'small'}
            variants={{
              small: {
                scale: 0.5
              },
              large: {
                scale: 0.5,
                transition: {
                  duration: 0.3,
                  ease: 'easeInOut'
                }
              }
            }}
          >
            <a href="/">
              <Logo
                src="/images/vice/logo-no-border.png"
                height={64}
                logoOffset={logoOffset}
                width={330}
                color={mainColor}
              />
            </a>
          </motion.div>
          {width > 1000 ? (
            <MenuItems setShowModal={setShowModal} menuLinks={menuLinks} />
          ) : (
            <TurkeyBurger
              menuItems={menuLinks}
              color="white"
              toggleMenuActive={toggleMenuActive}
              menuActive={menuOpen}
            />
          )}
        </FixedWidth>
      </HeaderContainer>
    </Outer>
  )
}

export default Header
