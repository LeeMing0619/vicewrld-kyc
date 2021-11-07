// @ts-nocheck
import styled from 'styled-components'
import getRgbaVal from '../../../../helpers/getRgbaVal'

export const NeonPulsingBorder = styled.img`
  position: relative;
  filter: drop-shadow(0 0 0.75rem ${({ color }) => getRgbaVal(color, 1)});
  animation: glow 2s infinite ease-in-out;
  border-radius: ${({ isCircle }) => (isCircle ? '250px' : 0)};
  @keyframes glow {
    0%,
    100% {
      filter: drop-shadow(0 0 1rem ${({ color }) => getRgbaVal(color, 1)});
    }
    50% {
      filter: drop-shadow(0 0 0.7rem ${({ color }) => getRgbaVal(color, 0.8)});
    }
  }
`

const PulsingImage = ({ color, src, height, width, isCircle = false }) => {
  return (
    <NeonPulsingBorder
      isCircle={isCircle}
      color={color}
      src={src}
      height={height}
      width={width}
    />
  )
}

export default PulsingImage
