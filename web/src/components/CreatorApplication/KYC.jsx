import { Box } from '@/components/ViceHeader/UI/Box'
import { useState, useEffect } from 'react'

import { useChangeIsCreatorMutation } from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

const isDev = process.env.NODE_ENV === 'development'

const index = ({ setCanProceed, setNextAction }) => {
  const [currentUser] = useCurrentUser()
  const [declineReasons, setDeclineReasons] = useState(null)
  const [approved, setApproved] = useState(false)
  const [applicationId, setApplicationId] = useState(
    currentUser?.creatorApplicationId ?? null
  )
  const [changeIsCreator] = useChangeIsCreatorMutation()

  const Approved = () => {
    return (
      <Box direction="column" style={{ padding: '32px 0 0' }}>
        <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>
          Congratulations!
        </h3>
        <h5
          style={{
            fontSize: '1.25rem',
            textAlign: 'center',
            margin: '16px auto'
          }}
        >
          Your application has been approved!
        </h5>

        <p>Click the next button below to proceed!</p>
      </Box>
    )
  }

  const Declined = () => (
    <Box direction="column" style={{ padding: '32px 0 0' }}>
      <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Sorry!</h3>
      <h5
        style={{
          fontSize: '1.25rem',
          textAlign: 'center',
          margin: '16px auto'
        }}
      >
        Your application has been declined for the following reasons:
      </h5>
      <Box direction="column" style={{ margin: '16px auto' }}>
        {declineReasons.map(({ message }) => message)}
      </Box>
      <p>
        Please email <a href="mailto:hello@vicewrld.com">hello@vicewrld.com</a>{' '}
        if you think this is an error!
      </p>
    </Box>
  )

  const getApplicationStatus = async () => {
    fetch(
      isDev
        ? `http://138.68.184.93:5000/getApplicationStatus/${applicationId}`
        : 'productionURLHere',
      {
        method: 'GET'
      }
    )
      .then(res => res.json())
      .then(data => {
        const { id, overallResult } = data
        if (id === applicationId) {
          if (overallResult.status === 'declined') {
            setDeclineReasons(overallResult.concerns)
          } else if (overallResult.status === 'approved') {
            setApproved(true)
            changeIsCreator({
              variables: {
                input: new Boolean(true)
              }
            })
          }
        }
      })
  }

  const goToProfile = () => {
    console.log('nav to profile')
  }

  useEffect(() => {
    if (approved) {
      console.log('approved')
      setCanProceed(true)
      setNextAction(goToProfile)
    }
  }, [approved])

  useEffect(() => {
    if (applicationId) {
      getApplicationStatus()
    } else {
      fetch(isDev ? 'http://138.68.184.93:5000/getKycToken' : 'productionURLHere', {
        method: 'GET'
      })
        .then(res => res.json())
        .then(({ token }) => {
          window.getidWebSdk.init({
            apiUrl: 'https://vicewrld.sb.getid.dev',
            jwt: `${token}`,
            containerId: 'targetContainer',
            flowName: 'getid-doc-selfie-liveness',
            onComplete: data => {
              console.log(
                'everything is complete',
                setApplicationId(data.applicationId)
              )
            },
            onFail: ({ code, message }) => {
              console.log('something went wrong: ' + message)
            }
          })
        })
    }
  }, [applicationId])

  return (
    <div style={{ padding: 32, margin: 32 }}>
      {approved ? (
        <Approved />
      ) : declineReasons ? (
        <Declined />
      ) : applicationId ? (
        <img
          alt="cherry"
          style={{ width: 128, height: 128 }}
          src="/images/vice/cherry-logo.png"
          className={`object-contain animate-pulse select-none pointer-events-none`}
        />
      ) : (
        <div id="targetContainer" />
      )}
    </div>
  )
}

export default index
