// @ts-nocheck
import React from 'react'
import styled, { css } from 'styled-components'
import Menu from './Menu'
import '../../../style/hamburgers.css'

const TurkeyBurgerMenuContainer = styled.div`
  position: absolute;
  padding-top: 20px;
  padding-right: 64px;
  top: 0;
  right: 0;
  @media screen and (max-width: 600px) {
    padding-right: 16px;
  }
`

const BurgerButton = styled.button``

const BurgerMenu = styled.span`
  background-color: ${(props) => props.color}!important;
  &::after {
    background-color: ${(props) => props.color}!important;
  }
  &::before {
    background-color: ${(props) => props.color}!important;
  }
`

const MenuContainer = styled.div`
  width: 25vw;
  height: 100vh;
  background-color: var(--background-color);
  position: fixed;
  top: 0;
  right: 0;
  transition: all 0.5s ease-in-out;
  overflow: scroll;
  margin-left: 64px;
  z-index: 10;
  padding-bottom: 96px;
  z-index: 2;
  @media screen and (min-width: 800px) {
    min-width: 400px;
  }
  ${(props) =>
    props.menuActive
      ? css`
          /*visible */
          transition-delay: 100ms;
          transform: translate3d(0vw, 0, 0);
          z-index: 100;

          @media screen and (max-width: 800px) {
            width: 100vw;
          }
        `
      : css`
          /*hidden */

          margin-right: -50vw;

          @media and screen and (max-width: 800px) {
            margin-right: -100vw;
          }
        `}
`

const Hamburger = ({ toggleMenuActive, menuActive, color = 'black', menuItems }) => {
  return (
    <TurkeyBurgerMenuContainer>
      <BurgerButton
        className={`hamburger hamburger--spring ${menuActive ? 'is-active' : ''}`}
        type="button"
        onClick={toggleMenuActive}
      >
        <BurgerMenu className="hamburger-box">
          <BurgerMenu style={{ backgroundColor: color }} color={color} className="hamburger-inner" />
        </BurgerMenu>
      </BurgerButton>
      <MenuContainer menuActive={menuActive}>
        <Menu isActive={menuActive} menuItems={menuItems} toggleMenuActive={toggleMenuActive} />
      </MenuContainer>
    </TurkeyBurgerMenuContainer>
  )
}

export default Hamburger
