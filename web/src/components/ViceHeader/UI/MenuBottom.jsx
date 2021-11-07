// @ts-nocheck
import React from 'react'
import styled, { css } from 'styled-components'
import SocialLinks from './SocialLinks'

const Container = styled.div`
  transition-delay: ${(props) => props.delay};

  /* position: absolute;
  bottom: 80px;
  right: 32px; */
  width: 100%;
  margin-right: -64px;
  opacity: 0;
  text-align: right;
  transition: transform 0s ease-in-out;

  margin-bottom: 8px;
  ${(props) =>
    props.isActive &&
    css`
      margin-right: 40px;
      transition: all 0.4s ease-in-out;
      opacity: 1;
      transform: translate(0);
      @media screen and (max-width: 600px) {
        margin-right: 16px;
      }
    `}
`

const MailLink = styled.a``
const Icon = styled.i`
  margin-right: 8px;
`

const MenuBottom = ({ menuLength, isActive }) => {
  return (
    <Container
      delay={`${200 * (menuLength + 3)}ms`}
      style={{
        transitionDelay: `${200 * (menuLength + 3)}ms`,
        display: 'flex',
        position: 'absolute',
        bottom: 32,
      }}
      isActive={isActive}
    >
      <SocialLinks style={{ alignSelf: 'flex-end', margin: 'auto' }} />
    </Container>
  )
}

export default MenuBottom
