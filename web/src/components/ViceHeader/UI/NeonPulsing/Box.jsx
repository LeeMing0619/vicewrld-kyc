import styled, { css } from 'styled-components'
import getRgbaVal from '../../../../helpers/getRgbaVal'

export const NeonPulsingBorder = styled.div`
  transition: 0.3s ease-in-out;
  @keyframes glow${({ isSecondary }) => (isSecondary ? '-2' : '')} {
              0%,
              100% {
                filter: drop-shadow(
                  0 0 1rem ${({ color }) => getRgbaVal(color, 1)}
                );
              }
              50% {
                filter: drop-shadow(
                  0 0 0.7rem ${({ color }) => getRgbaVal(color, 0.8)}
                );
              }
            }
          }
  ${({ hoverOnly }) =>
    hoverOnly
      ? css`
        filter: drop-shadow(
              0 0 0.75rem ${({ color }) => getRgbaVal('#000000', 0)}
            );
          :hover {
            position: relative;
            filter: drop-shadow(
              0 0 0.75rem ${({ color }) => getRgbaVal(color, 1)}
            );
            animation: ${({ isSecondary }) => (isSecondary ? 'glow-2' : 'glow')}
              2s infinite ease-in-out;
            height: ${({ height }) => height}px;
            width: ${({ width }) => width}px;
       
        `
      : css`
          position: relative;
          filter: drop-shadow(
            0 0 0.75rem ${({ color }) => getRgbaVal(color, 1)}
          );
          animation: ${({ isSecondary }) => (isSecondary ? 'glow-2' : 'glow')}
            2s infinite ease-in-out;
          height: ${({ height }) => height}px;
          width: ${({ width }) => width}px;
          @keyframes glow${({ isSecondary }) => (isSecondary ? '-2' : '')} {
            0%,
            100% {
              filter: drop-shadow(
                0 0 1rem ${({ color }) => getRgbaVal(color, 1)}
              );
            }
            50% {
              filter: drop-shadow(
                0 0 0.7rem ${({ color }) => getRgbaVal(color, 0.8)}
              );
            }
          }
        `}
`

const PulsingBox = ({
  color,
  height,
  width,
  children,
  isSecondary = false,
  style = {},
  hoverOnly = true
}) => {
  return (
    <NeonPulsingBorder
      style={{ ...style }}
      color={color}
      height={height}
      width={width}
      isSecondary={isSecondary}
      hoverOnly={hoverOnly}
    >
      {children}
    </NeonPulsingBorder>
  )
}

export default PulsingBox
