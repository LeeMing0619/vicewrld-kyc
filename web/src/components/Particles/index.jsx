import Particles from 'react-particles-js'
import { useWindowSize } from '../ViceHeader/hooks/useWindowSize'
import getRgbaVal from '../../helpers/getRgbaVal'
import { mainColor, complimentaryColor } from '../../vars/colors'

const Comp = ({ invert = false, fewer = false }) => {
  const { width } = useWindowSize()
  return (
    <Particles
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zComp: 4,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: width > 600 ? 1 : 0.7
      }}
      params={{
        particles: {
          number: {
            value: fewer ? 15 : width > 1600 ? 50 : width > 600 ? 25 : 25
          },
          size: {
            value: 3
          },
          color: getRgbaVal(invert ? complimentaryColor : mainColor),
          links: { color: getRgbaVal(invert ? mainColor : complimentaryColor) }
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: 'repulse'
            }
          }
        }
      }}
    />
  )
}

export default Comp
