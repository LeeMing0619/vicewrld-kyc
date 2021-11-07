// @ts-nocheck
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { uuid } from 'uuidv4'
import MenuBottom from './MenuBottom'
// import { withRouter } from "next/router";

const MenuContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-right: 3vw;
  justify-content: center;
  position: relative;
`

const MenuItem = styled.li`
  margin-right: ${(props) => (props.entering ? '0px' : '-64px')};
  transform: translateX(${(props) => (props.entering ? 0 : 500)}px);
  opacity: ${(props) => (props.entering ? '1' : '0')};
  transition: transform ${(props) => props.duration}ms ease-in-out;
  display: flex;
  justify-content: flex-end;
  transition-delay: 600ms;
  padding-right: 32px;
  align-items: center;
  list-style: none;
`

const MenuLink = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Block = styled.div``

const LinkText = styled.h2`
  cursor: pointer;
  font-size: 2.5rem;
  margin: 16px 0;
  text-align: right;
  display: inline-block;
  position: relative;
  z-index: 2;
  transition: 0.3s ease-in-out;
  width: 100%;
  right: 0;
  color: ${(props) => (props.active || props.dropdownActive ? 'var(--main-color)' : 'var(--primary-text)')};
  &:hover {
    text-shadow: 0 0 8px var(--complimentary-color), 0 0 12px var(--complimentary-color),
      0 0 16px var(--complimentary-color), 0 0 32px var(--complimentary-color), 0 0 48px var(--complimentary-color),
      0 0 45px var(--complimentary-color), 0 0 36px var(--complimentary-color);
    &::after {
      width: 100%;
      right: 0;
    }
  }
  &::after {
    background: none repeat scroll 0 0 transparent;
    bottom: 4px;
    content: '';
    height: 12px;
    right: 100%;
    z-index: -1;
    transition-delay: 0;
    position: absolute;
    background: var(--background-color);
    transition: width 0.5s ease 0s, right 0.5s ease 0s;
    width: 0;
    opacity: ${(props) => (props.dropdownActive ? 0 : 1)};
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`

const ArrowIcon = styled.i`
  font-size: 1rem;
  display: inline-block;
  transition: color 0.3s ease-in-out;
  margin-left: 16px;
  transform: rotate(${(props) => (props.activeDropdown ? '0deg' : '-90deg')});
  transition: all 0.3s ease-in-out;
`

const ChildLink = styled.a`
  font-size: 1.2rem;
  margin: 16px auto;
  width: 100%;
  transition: 0.3s ease-in-out;
  &:hover {
    color: var(--complimentary-color);
  }
`

const ChildLinkText = styled.h5`
  font-size: 1.2rem;
  width: 100%;
  margin: 16px auto;
  @media screen and (max-width: 600px) {
    font-size: 0.9rem;
    margin: 4px auto;
  }
`

const ChildLinksContainer = styled.ul`
  padding: 0 0 0 4px;
  text-align: right;
  margin: 0;
  overflow: hidden;
  max-height: ${(props) => props.maxHeight};
  transition: max-height 0.4s ease-in-out;
`

const Menu = ({ isActive, toggleMenuActive, dropdownRight = true, menuItems }) => {
  const isOnHome = false
  const [currentPage, setCurrentPage] = useState('/')
  const [activeDropdown, setActiveDropdown] = useState(null)

  return (
    <>
      <MenuContainer>
        {menuItems.map((item, i) => {
          const hasChildren = item?.Children?.length > 0
          return (
            <MenuItem duration={200 * (i + 2)} key={`menu-${item.name}`} entering={isActive}>
              <Block>
                <MenuLink
                  onClick={() => {
                    if (!hasChildren) toggleMenuActive()
                    setActiveDropdown(activeDropdown === i ? null : i)
                  }}
                  href={hasChildren ? '#' : isOnHome ? item.url : `/${item.url}`}
                >
                  {hasChildren && !dropdownRight && (
                    <ArrowIcon className="fa fa-chevron-down" activeDropdown={activeDropdown === i} />
                  )}
                  <LinkText active={currentPage === item.url} dropdownActive={hasChildren && activeDropdown === i}>
                    {item.name}
                  </LinkText>
                  {hasChildren && dropdownRight && (
                    <ArrowIcon className="fa fa-chevron-down" activeDropdown={activeDropdown === i} />
                  )}
                </MenuLink>
                {hasChildren && dropdownRight && (
                  <ChildLinksContainer maxHeight={activeDropdown === i ? `${item.Children.length * 64}px` : 0}>
                    {item.Children.map((child, j) => {
                      return (
                        <ChildLink
                          href={child.URL}
                          onClick={() => {
                            toggleMenuActive()
                          }}
                          key={`dropdown-child-${uuid()}`}
                        >
                          <ChildLinkText>{child.name}</ChildLinkText>
                        </ChildLink>
                      )
                    })}
                  </ChildLinksContainer>
                )}
              </Block>
            </MenuItem>
          )
        })}
        <MenuBottom isActive={isActive} menuLength={menuItems.length} />
      </MenuContainer>
    </>
  )
}

export default Menu
// export default withRouter(Menu)
