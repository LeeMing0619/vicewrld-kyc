// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { useWindowSize } from '../hooks/useWindowSize'

const FixedWidthContainer = styled.div`
  width: 100%;
  max-width: ${({ maxWidth, isFullWidth }) =>
    isFullWidth ? '100vw' : `${maxWidth}px`};
  padding: 0;
  height: ${({ customHeight }) => customHeight ?? 'auto'};
  padding: ${({ screenWidth, maxWidth }) =>
    screenWidth < maxWidth ? '0px' : '0px'};
  display: flex;
  ${({ isFullHeight }) => isFullHeight && 'min-height:100vh;'}
  justify-content: space-between;
  align-items: center;
`
const FixedWidth = ({
  maxWidth = 1200,
  children,
  isFullWidth = false,
  isFullHeight = false,
  customHeight = null,
  style = {}
}) => {
  const { width, isLandscape } = useWindowSize()
  return (
    <FixedWidthContainer
      screenWidth={width}
      maxWidth={maxWidth}
      isFullWidth={isFullWidth}
      isFullHeight={isFullHeight}
      isLandscape={isLandscape}
      customHeight={customHeight}
      style={{ ...style }}
    >
      {children}
    </FixedWidthContainer>
  )
}

export default FixedWidth
