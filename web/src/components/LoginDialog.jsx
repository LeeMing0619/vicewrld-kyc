import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useLoginDialog } from '@/hooks/useLoginDialog'
import { useForm } from 'react-hook-form'
import { useCreateAccountMutation, useLoginMutation } from '@/graphql/hooks'
import {
  IconEmail,
  IconSpinner,
  IconUser,
  IconUserToServerArrow,
  IconX
} from '@/components/ui/icons/Icons'
import { useState, useEffect } from 'react'
import { VectorLogo } from '@/components/ui/vectors'
import isEmail from 'validator/es/lib/isEmail'
import StyledDialog from '@/components/ui/dialog/StyledDialog'
import ShowPasswordButton from '@/components/ui/ShowPasswordButton'
import AvatarSelector from './user/AvatarSelector'
import { useWindowSize } from '@/components/ViceHeader/hooks/useWindowSize'
import styled from 'styled-components'
import LoadingScreen from '@/pages/LoadingScreen'
import Web3 from 'web3/dist/web3.min.js'

import { useChangeUserAvatarWithUrlMutation } from '@/graphql/hooks'

const LogoHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  padding: 16px;
`

const usernameRegex = /^[A-Za-z0-9-_]+$/gi

let web3 = undefined;

export default function LoginDialog() {
  const { width } = useWindowSize()
  const [currentUser, loading] = useCurrentUser()
  const [open, setOpen, isCreateAccount, setCreateAccount] = useLoginDialog()
  const [disabled, setDisabled] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const {
    handleSubmit,
    register,
    watch,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    shouldUnregister: true
  })
  const [avatarSelectorOpen, setAvatarSelectorOpen] = useState(false)
  const [userNameInputOpen, setUsernameInputOpen] = useState(false)
  const [isShowButton, setIsShowButton] = useState(false)
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null)
  const [publicAddress, setPublicAddress] = useState(null)
  const email = watch('email')
  const username = watch('username')
  const usernameOrEmail = watch('usernameOrEmail')
  const password = watch('password')
  const confirmPassword = watch('confirmPassword')
  const [createAccount, { loading: createAccountLoading }] =
    useCreateAccountMutation()
  const [login, { loading: loginLoading }] = useLoginMutation()

  const openAvatarSelector = () => setAvatarSelectorOpen(true)

  const selectAvatar = index => {
    setSelectedAvatarIndex(index)
    setAvatarSelectorOpen(false)
    changeAvatarWithUrl({
      variables: {
        input: {
          newAvatarUrl: `https://vicewrld.com/img/vicewrld/avatars/vice-avatar-${index}.jpg`
        }
      }
    })
    location.reload()
  }
  const [changeAvatarWithUrl] = useChangeUserAvatarWithUrlMutation()

  const onSubmit = ({ usernameOrEmail, email, username, password }) => {
    if (isCreateAccount) {
      createAccount({
        variables: {
          input: {
            username,
            password,
            email: email ? email : null
          }
        }
      }).then(
        ({
          data: {
            createAccount: { accessToken, user }
          }
        }) => {
          localStorage.setItem('token', accessToken)
          setAvatarSelectorOpen(true)
          setIsShowButton(true)
        }
      )
    } else {
      const input = isEmail(usernameOrEmail)
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
      login({ variables: { input: { ...input, password } } }).then(
        ({
          data: {
            login: { accessToken, user }
          }
        }) => {
          localStorage.setItem('token', accessToken)
          location.href = '/'
        }
      )
    }
  }

  const func_open = async () => {
    await window.ethereum.enable();
  }
  const onClick_metamask = async () => {    
    if (!window.ethereum) {
		  window.alert('Please install MetaMask first.');
		  return;
		}

    if (!web3) {
			try {
				// Request account access if needed
				//await window.ethereum.enable();
        await window.ethereum.request({ method: 'eth_requestAccounts' })

			// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3(window.ethereum);
		 	} catch (error) {
		 		window.alert('You need to allow MetaMask.');
        // window.ethereum.disable();
		 		return;
		 	}
		}

    const coinbase = await web3.eth.getCoinbase();

    web3.eth.net.getId().then(val => {
      if (val !== 56) {
        if (window.ethereum) {
          window.alert('Please change Network to BSC Mainnet')
          try {
            window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{chainId: '0x38'}]
            })
            .then(() => web3 = new Web3(window.ethereum))
            .catch(err => {
              console.log(err.code)
              if (err.code === 4902) {
                try {console.log(err.code)
                  window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{ chainId: '0x38', rpcUrl: ' https://bsc-dataseed.binance.org/', chainName:'BNB' /* ... */ }],
                  });
                } catch (addError) {
                  // handle "add" error
                }
              }
            })
          } catch (switchError) { 
            console.log(switchError)            
          }         
        }
        return;
      } else {
        if (!coinbase) {
          window.alert('Please activate MetaMask first.');
          return;
        }    
        const p_address = coinbase.toLowerCase();
        // console.log(p_address)
        // if (!web3) {
        // 	try {
        //     await window.ethereum.disable();
        //   }
        //   catch (error) {
        //   }
        // }
        setPublicAddress(p_address)
        
        if (isCreateAccount) {
          
        } else {
          //SignIn with metamask
          login({ variables: { input: { metamask: p_address } } }).then(
            ({
              data: {
                login: { accessToken, user }
              }
            }) => {         
              location.href = '/' 
              localStorage.setItem('token', accessToken)
            }
          ).catch((e) => {        
            if (p_address) {
              setUsernameInputOpen(true)
              setIsShowButton(true)
            }
          })
        } 
      }
    });
  }

  const onCaptureKey = (e) => {
    if (e.key === 'Enter') {
      createAccount({
        variables: {
          input: {
            username: usernameOrEmail,
            password,
            email: email ? email : null,
            metamask: publicAddress
          }
        }
      }).then(
        ({
          data: {
            createAccount: { accessToken, user }
          }
        }) => {
          localStorage.setItem('token', accessToken)
          setAvatarSelectorOpen(true)
          setIsShowButton(true)
          setUsernameInputOpen(false)
        }
      )
    }
  }

  const onSignUp = () => {
    createAccount({
      variables: {
        input: {
          username: usernameOrEmail,
          password,
          email: email ? email : null,
          metamask: publicAddress
        }
      }
    }).then(
      ({
        data: {
          createAccount: { accessToken, user }
        }
      }) => {
        localStorage.setItem('token', accessToken)
        setAvatarSelectorOpen(true)
        setIsShowButton(true)
        setUsernameInputOpen(false)
      }
    )
  }
  const close = () => {
    reset()
    setOpen(false)
  }

  useEffect(() => {
    setDisabled(
      !(isCreateAccount
        ? !!username &&
          username.length >= 3 &&
          username.length <= 20 &&
          !!password &&
          password.length >= 6 &&
          !!confirmPassword &&
          confirmPassword === password
        : !!usernameOrEmail && !!password)
    )
  }, [
    username,
    isCreateAccount,
    email,
    password,
    confirmPassword,
    usernameOrEmail
  ])

  useEffect(() => {
    if (!currentUser && !open && !loading) {
      setOpen(true)
      return       
    }
    if (currentUser && open) {
      setOpen(false)
      return      
    }
  }, [currentUser])

  return loading ? 
  (<>
    <LoadingScreen />
  </>)
    :(
    <StyledDialog
      close={close}
      open={open}
      show={isShowButton}
      noOpacity
      closeOnOverlayClick={false}
      onSubmit={handleSubmit(onSubmit)}
      buttons={
        <button
          type="submit"
          className={`form-button-submit`}
          disabled={disabled}
        >
          {(isCreateAccount && createAccountLoading) ||
          (!isCreateAccount && loginLoading) ? (
            <IconSpinner className="w-5 h-5" />
          ) : (
            <IconUserToServerArrow className="w-5 h-5" />
          )}
        </button>
      }
      metamaskButtons={
        <button
          type="button"
          className={`form-button-submit`}
        >
          {(isCreateAccount && createAccountLoading) ||
          (!isCreateAccount && loginLoading) ? (
            <IconSpinner className="w-5 h-5" />
          ) : (
            isCreateAccount ? 'SignUp with Metamask' : 'SignIn with Metamask' 
          )}
        </button>
      }
      createAccount={isCreateAccount}
      metamaskButtonClick={onClick_metamask}
    >
      {userNameInputOpen ? (
        <>
          <div className="rounded-t-lg h-2" />
            {width < 600 && (
              <LogoHolder>
                <VectorLogo noFlex />
              </LogoHolder>
            )}
            <div className="px-5 pt-2 pb-4 text-left">
              <div className="space-y-4">
                <div>
                  <div className="relative">
                    <input
                      id="usernameOrEmail"
                      {...register('usernameOrEmail', {
                        shouldUnregister: true
                      })}
                      className={`form-input`}
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    {...register('password', { required: true })}
                    className={`form-input`}
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    onKeyPress={onCaptureKey}
                  />
                  <ShowPasswordButton
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
                <div className="relative">
                  <div className="right-5 left-5 bottom-4 transform flex items-center space-x-3 justify-center h-9">
                    <button
                      type="button"
                      className={`form-button-submit`}
                      onClick={onSignUp}
                    >
                      <IconUserToServerArrow className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </>
      ) : (
        <>
        {avatarSelectorOpen ? (
          <AvatarSelector
            selectAvatar={selectAvatar}
            setAvatarSelectorOpen={setAvatarSelectorOpen}
            setIsShowButton={setIsShowButton}
          />
        ) : (
          <>
            <div className="rounded-t-lg h-2" />
            {width < 600 && (
              <LogoHolder>
                <VectorLogo noFlex />
              </LogoHolder>
            )}
            <div className="px-5 pt-2 pb-9 text-left">
              <div className="pb-4 flex items-center">
                <div
                  onClick={() => {
                    if (isCreateAccount) {
                      setCreateAccount(false)
                      reset()
                    }
                  }}
                  style={{ fontFamily: 'Mylodon', flex: width < 600 ? 1 : null }}
                  className={`text-sm cursor-pointer mr-3 py-3 border-b-2 inline-flex items-center justify-center px-3 ${
                    isCreateAccount
                      ? 'border-transparent text-secondary'
                      : 'dark:border-gray-300 text-primary'
                  }`}
                >
                  Log In
                </div>
  
                <div
                  style={{ fontFamily: 'Mylodon', flex: width < 600 ? 1 : null }}
                  onClick={() => {
                    if (!isCreateAccount) {
                      setCreateAccount(true)
                      reset()
                    }
                  }}
                  className={`text-sm cursor-pointer py-3 border-b-2 inline-flex items-center justify-center px-3 ${
                    isCreateAccount
                      ? 'dark:border-gray-300 text-primary'
                      : 'border-transparent text-secondary'
                  }`}
                >
                  Sign Up
                </div>
                {width > 600 && (
                  <div className="ml-auto">
                    <VectorLogo className="h-3.5 text-secondary" />
                  </div>
                )}
                {/* <IconX
              className="ml-5 w-5 h-5 text-tertiary highlightable"
              onClick={() => close()}
            /> */}
              </div>
              
              <hr className="mb-6" style={{border: '0', height: '1px', backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255,255, 0.75), rgba(255, 255, 255, 0))'}}></hr>
              
              <div className="space-y-4">
                {isCreateAccount ? (
                  <>
                    <div>
                      <p style={{ fontSize: 12, margin: '16px auto 32px' }}>
                        By Signing up you acknowledge you are over 18 years old
                        (or the legal age to view adult content in your
                        country/region).
                      </p>
                      <div className="relative">
                        <input
                          id="username"
                          {...register('username', {
                            required: true,
                            pattern: usernameRegex,
                            maxLength: 20,
                            minLength: 3
                          })}
                          className={`form-input-icon`}
                          placeholder="Username"
                          minLength={3}
                          maxLength={20}
                        />
                        <IconUser className={`form-input-icon-icon`} />
                      </div>
                      {errors.username?.type === 'minLength' && (
                        <div className={`form-error`}>
                          Username must be between 3 and 20 characters
                        </div>
                      )}
                      {errors.username?.type === 'pattern' && (
                        <div className={`form-error`}>
                          Letters, numbers, dashes, and underscores only
                        </div>
                      )}
                    </div>
  
                    <div>
                      <div className="relative">
                        <input
                          id="email"
                          {...register('email', {
                            required: true,
                            validate: {
                              email: value =>
                                !value || isEmail(value) || 'Invalid email'
                            }
                          })}
                          className={`form-input-icon`}
                          placeholder="Email"
                          type="email"
                        />
                        <IconEmail className={`form-input-icon-icon`} />
                      </div>
                      {errors.email?.type === 'email' && (
                        <div className={`form-error`}>{errors.email.message}</div>
                      )}
                    </div>
                  </>
                ) : (
                  <input
                    id="usernameOrEmail"
                    {...register('usernameOrEmail', {
                      shouldUnregister: true
                    })}
                    className={`form-input`}
                    placeholder="Username or email"
                  />
                )}
  
                {isCreateAccount ? (
                  <>
                    <div>
                      <div className="relative">
                        <input
                          id="password"
                          {...register('password', {
                            required: true,
                            minLength: 6
                          })}
                          className={`form-input-password`}
                          placeholder="Password"
                          type={showPassword ? 'text' : 'password'}
                          minLength={6}
                        />
                        <ShowPasswordButton
                          showPassword={showPassword}
                          setShowPassword={setShowPassword}
                        />
                      </div>
                      {errors.password?.type === 'minLength' && (
                        <div className={`form-error`}>
                          Password must be at least 6 characters
                        </div>
                      )}
                    </div>
  
                    <div>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          {...register('confirmPassword', {
                            required: true,
                            validate: {
                              matchesPreviousPassword: value => {
                                const { password } = getValues()
                                return (
                                  password === value || 'Passwords do not match'
                                )
                              }
                            }
                          })}
                          className={`form-input-password`}
                          placeholder="Confirm Password"
                          type={showPassword ? 'text' : 'password'}
                        />
                        <ShowPasswordButton
                          showPassword={showPassword}
                          setShowPassword={setShowPassword}
                        />
                      </div>
                      {!!password &&
                        !!confirmPassword &&
                        password !== confirmPassword && (
                          <div className={`form-error`}>
                            Passwords do not match
                          </div>
                        )}
                    </div>
                  </>
                ) : (
                  <div className="relative">
                    <input
                      id="password"
                      {...register('password', { required: true })}
                      className={`form-input`}
                      placeholder="Password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    <ShowPasswordButton
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}  
        </>
      )}
          
    </StyledDialog>
  )
}
