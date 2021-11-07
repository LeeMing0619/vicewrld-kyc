import styled, { css } from 'styled-components'

export const Box = styled.div`
  display: flex;
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  justify-content: ${({ justify }) => justify ?? 'center'};
  align-items: ${({ align }) => align ?? 'center'};
  flex-direction: ${({ direction }) => direction ?? 'row'};
  flex-wrap: ${({ wrap }) => wrap ?? 'nowrap'};
  ${({ flex }) =>
    flex &&
    css`
      flex: ${flex};
    `}
  ${({ flexFlow }) =>
    flexFlow &&
    css`
      flex-flow: ${flexFlow};
    `}
  ${({ position }) =>
    position &&
    css`
      position: ${position};
    `}
`

const index = ({
  children,
  align = 'center',
  justify = 'center',
  direction = 'row',
  flex = null,
  wrap = false,
  style = {},
  fullWidth = false,
  flexFlow = null
}) => {
  return (
    <Box
      align={align}
      justify={justify}
      wrap={wrap ? 'wrap' : 'nowrap'}
      direction={direction}
      flex={flex}
      flexFlow={flexFlow}
      fullWidth={fullWidth}
      style={{ ...style }}
    >
      {children}
    </Box>
  )
}

export default index
