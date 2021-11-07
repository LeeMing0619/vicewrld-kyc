import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ZoomIn = ({
  children,
  style = {},
  startOnScroll = true,
  from = 'top',
  scrollAmount = 100,
  delay = 0,
  duration = 0.3,
  runMultiple = false
}) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('animationEnd')
    } else {
      runMultiple && controls.start('start')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="start"
      style={{ transformOrigin: 'center', ...style }}
      variants={{
        start: {
          translateY:
            from === 'top' || from === 'bottom'
              ? from === 'top'
                ? -scrollAmount
                : scrollAmount * 2
              : 0,
          translateX:
            from === 'top' || from === 'bottom'
              ? 0
              : from === 'left'
              ? -scrollAmount
              : scrollAmount,
          opacity: 0
        },
        animationEnd: {
          scale: 1,
          translateY: 0,
          translateX: 0,
          opacity: 1,
          transition: {
            duration,
            delay,
            ease: 'easeInOut'
          }
        },
        exit: {
          scale: 1,
          translateY: 0,
          translateX: 0,
          opacity: 0,
          transition: {
            duration,
            delay,
            ease: 'easeInOut'
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export default ZoomIn
