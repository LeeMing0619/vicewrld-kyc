import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Particles from '@/components/Particles'
import GlowingButton from '@/components/ui/GlowingButton'
import NeonPulsingBox from '../ViceHeader/UI/NeonPulsing/Box'
import KYC from './KYC'
import FadeIn from '@/components/ViceHeader/UI/Animation/FadeIn'
import { mainColor, secondaryColor } from '@/vars/colors'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import {
  Container,
  ButtonHolder,
  Dialogue,
  Copy,
  Title,
  Logo,
  SubTitle
} from './parts'

const index = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [canProceed, setCanProceed] = useState(false)
  const [nextAction, setNextAction] = useState(null)

  const [currentUser] = useCurrentUser()

  const history = useHistory()

  const pages = [
    <FadeIn
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Logo alt="cherry logo" src="/images/vice/cherry-logo.png" />
      <SubTitle>Join Vicewrld</SubTitle>
      <Title>Apply to be a creator</Title>
      <Copy>
        If you are over 18 , confident and body confident then we want you!
        <br />
        <br />
        <strong>Even playing field for all</strong>
        <br />
        <br />
        Creators get two groups on the forums create one for your socialist kink
        and one for your fan page, giving you a great supply of targeted users .
        Busiest group each week gets $500 prize.
        <br />
        <br />
        <strong>Get KYC verified in under 30mins</strong>
        <br />
        <br /> No long waiting times for verification get started straight away
        all you need is your ID Fast payouts in your local currency.
        <br />
        <br />
        No long waiting times or confusing payment methods spend your earnings
        on a Visa card almost immediately after you’ve earned it at anywhere you
        see the visa sign with our dedicated partners. We accept $VICE crypto
        but you can spend as usual no stress Creator care
        <br />
        <br />
        Unlike many other adult platforms VICEWRLD will give free advice and
        marketing, not only that we will be offering STÉM education grants for
        those creators wishing to or who are already studying at university.
        Lower fees than any other mainstream adult platform only ever pay
        between just 2-10%, you will also earn a share of the 3% reflection
        payout on every transaction that takes place on your $VICE earnings
        balance. <br />
        <br />
        <strong>All in one platform</strong>
        <br />
        <br />
        VICEWRLD combines Forums Content marketplace LIVE-STREAMING Gaming All
        in one handy platform, no more redirecting traffic for hours on end it’s
        all in house. <br />
        <br />
        <strong>Safety &amp; anti trafficking</strong>
        <br />
        <br />
        VICEWRLD values safety of the most vulnerable that’s why we are
        implementing specialists technology to keep our platform free from
        underage materials from our partners. We also donate 1% of all
        transactions to fighting the problems with human trafficking Be your own
        boss.
        <br />
        <br />
        Work around your existing life work as much or as little as you like!
        Our creators are self employed no set times or minimum shifts and
        certainly no fines.
        <br />
        <br />
        <strong>Referral programme</strong>
        <br />
        <br />
        We have a great referral scheme meaning you can earn $$$$ by bringing on
        other creators, this can be great for covering you through sickness or
        holidays.
        <br />
        <br />
        <strong>LGBTQ + Creators of colour</strong>
        <br />
        <br />
        VICEWRLD is a non discriminatory platform , we encourage and promote
        creators of all backgrounds and gender identity equally . So what are
        you waiting for join the hottest new platform apply NOW!
      </Copy>
    </FadeIn>,
    <FadeIn
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
      startOnScroll={false}
    >
      <SubTitle>Verify Your Identity</SubTitle>
      <KYC setCanProceed={setCanProceed} setNextAction={setNextAction} />
    </FadeIn>
  ]

  const goToProfile = () => {
    console.log('profile from outeer')
    history.push(`/profile/${currentUser?.username}`)
  }

  return (
    <Container style={{ backgroundColor: 'black' }}>
      <Particles />
      <NeonPulsingBox color={mainColor} hoverOnly={false}>
        <Dialogue>
          {pages[currentPage]}
          <ButtonHolder>
            {currentPage > 0 && (
              <GlowingButton
                height={40}
                mainColor={secondaryColor}
                onClick={() => setCurrentPage(0)}
                style={{ marginRight: 8 }}
              >
                Back
              </GlowingButton>
            )}
            <GlowingButton
              height={40}
              disabled={currentPage === 1 && !canProceed}
              mainColor={
                currentPage === 1 && !canProceed ? '#ababab' : mainColor
              }
              onClick={() =>
                currentPage > 0 && canProceed
                  ? goToProfile()
                  : setCurrentPage(currentPage + 1)
              }
            >
              {currentPage === 0 ? 'Get Started' : 'Next'}
            </GlowingButton>
          </ButtonHolder>
        </Dialogue>
      </NeonPulsingBox>
    </Container>
  )
}

export default index
