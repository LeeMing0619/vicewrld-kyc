import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const FadeIn = ({
  children,
  startOnScroll = true,
  from = 'top',
  scrollAmount = 100,
  delay = 0,
  duration = 0.3,
  runMultiple = true,
  style = {}
  // runMultiple = false,
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
      style={{ ...style, transformOrigin: 'center' }}
      variants={{
        start: {
          opacity: 0
        },
        animationEnd: {
          opacity: 1,
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

export default FadeIn
