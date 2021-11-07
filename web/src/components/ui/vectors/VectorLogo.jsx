import { useState } from 'react'
import styled from 'styled-components'
import NeonImage from '../../ViceHeader/UI/NeonPulsing/Image'
import { mainColor } from '../../../vars/colors'

const Logo = styled(NeonImage)`
  margin-left: ${({ logoOffset }) => logoOffset}px!important;
`
export function VectorLogo({ className, paddingTop = 0, noFlex = false }) {
  const [id] = useState(new Date().getTime().toString())
  const logoOffset = 0

  return (
    <div
      style={{
        flex: noFlex ? null : 1,
        display: 'flex',
        paddingTop,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
    >
      <Logo
        src="/images/vice/logo-no-border.png"
        height={32}
        logoOffset={logoOffset}
        width={165}
        color={mainColor}
      />
    </div>
  )
}
