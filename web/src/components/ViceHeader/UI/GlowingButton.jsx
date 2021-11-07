// @ts-nocheck
import React, { useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import convert from 'color-convert'
import { changeHue } from '../../../helpers/colorConverters'

const secondStage = keyframes`
        from { 
          filter:hue-rotate(0deg);
        }
        100% {
          filter:hue-rotate(200deg);
    }
`

const Glowing = styled.button`
  -webkit-box-shadow: 0 3px 32px rgb(${({ rgb }) => rgb} / 54%);
  box-shadow: 0 3px 32px rgb(${({ rgb }) => rgb} / 54%);
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(${({ secondaryColor }) => secondaryColor}),
    to(${({ mainColor }) => mainColor})
  );
  background-image: -webkit-linear-gradient(
    left,
    ${({ secondaryColor }) => secondaryColor} 0,
    ${({ mainColor }) => mainColor} 100%
  );
  background-image: -o-linear-gradient(
    left,
    ${({ secondaryColor }) => secondaryColor} 0,
    ${({ mainColor }) => mainColor} 100%
  );
  background-image: linear-gradient(
    to right,
    ${({ secondaryColor }) => secondaryColor} 0,
    ${({ mainColor }) => mainColor} 100%
  );
  -webkit-transition: -webkit-box-shadow 0.4s;
  transition: -webkit-box-shadow 0.4s;
  -o-transition: box-shadow 0.4s;
  transition: box-shadow 0.4s;
  transition: box-shadow 0.4s, -webkit-box-shadow 0.4s;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease-in-out;
  animation: ${({ isInverted }) =>
    isInverted
      ? css`
          ${secondStage}
        `
      : ''};
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  &:hover {
    cursor: ${({ isInverted }) => (isInverted ? 'default' : 'pointer')};
    -webkit-box-shadow: 0 3px 32px rgb(${({ rgb }) => rgb} / 75%);
    box-shadow: 0 3px 32px rgb(${({ rgb }) => rgb} / 75%);
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 16px;
  }
`

const GlowingButton = ({
  mainColor = '#ffffff',
  children,
  height = 48,
  padding = 16,
  width = 190,
  border = 'none',
  borderRadius = 4,
  flexDirection = 'column',
  margin = '8px auto',
  isInverted = false,
  style = {},
  onClick = () => {
    console.warn('default click')
  }
}) => {
  const rgb = convert.hex.rgb(mainColor.split('#')[1]).join(' ')
  const secondaryColor = changeHue(mainColor, -20)
  return (
    <Glowing
      mainColor={mainColor}
      secondaryColor={secondaryColor}
      rgb={rgb}
      width={width}
      disabled={isInverted}
      style={{
        height,
        padding,
        width,
        border,
        borderRadius,
        display: 'flex',
        flexDirection,
        justifyContent: 'center',
        alignItems: 'center',
        margin,
        ...style
      }}
      isInverted={isInverted}
      onClick={onClick}
    >
      {children}
    </Glowing>
  )
}

export default GlowingButton
