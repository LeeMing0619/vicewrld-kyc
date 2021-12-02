import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import UserAvatar from '@/components/user/UserAvatar'
import {
  IconBell,
  IconDark,
  IconDownload,
  IconLight,
  IconSettings,
  IconSearch,
  IconFolder,
  IconKey,
  IconLogout
} from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useEffect, useState } from 'react'
import UserSettingsDialog from '@/components/user/UserSettingsDialog'
import { version } from '../../package.json'
import { useStore } from '@/hooks/useStore'
import { OnlineStatus, useChangeOnlineStatusMutation } from '@/graphql/hooks'
import { Link } from 'react-router-dom'
import { getDownloadLink } from '@/hooks/getDownloadLink'
import { useLoginDialog } from '@/hooks/useLoginDialog'
import { getOS } from '@/utils/getOS'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useWindowSize } from './ViceHeader/hooks/useWindowSize'
import Web3 from 'web3/dist/web3.min.js'

export default function BottomBar() {
  const [currentUser] = useCurrentUser()
  const offset = [0, 14]
  const [open, setOpen] = useState(false)
  const [walletId, setWalletID] = useState('')  
  const [networkType, setNetworkType] = useState('')  
  const [balance, setBalance] = useState('')

  const [updateAvailable, setUpdateAvailable] = useStore(s => [
    s.updateAvailable,
    s.setUpdateAvailable
  ])

  const { width } = useWindowSize()
  
  let web3 = undefined;
  web3 = new Web3(window.ethereum);
  web3.eth.getAccounts(function (err, accounts) { 
    // console.log(accounts[0]) 
    if (currentUser?.metamask)
      if (!accounts[0]) {
        localStorage.removeItem('token')        
        location.href = '/'
      }
  })
  
  if (currentUser?.metamask) {
    web3.eth.net.getNetworkType(function (err, type){
      switch (type) {
        case 'main': 
          setNetworkType('Mainnet')
          break;
        case 'morden': 
          setNetworkType('Morden')
          break;
        case 'ropsten': 
          setNetworkType('Ropsten')
          break;
        case 'private': 
          setNetworkType('Private')
          break;
        default:
          setNetworkType('Private')        
      }
    });
    let viceABI = [
     // balanceOf
      {
        "constant":true,
        "inputs":[{"name":"_owner","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"balance","type":"uint256"}],
        "type":"function"
      },
      // decimals
      {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
      }
    ]
    const tokenInst = new web3.eth.Contract(viceABI, "0xeea06FC74182B195f679f31d735D95EE502f03F3");
    const balance1 = tokenInst.methods.balanceOf(currentUser?.metamask).call().then(val => {
      var balance = web3.utils.fromWei(val, 'ether')
      setBalance(parseFloat(balance).toFixed(3))
    });
    
    //web3.eth.getBalance(currentUser?.metamask).then(val => setBalance(val));
    
    //web3.eth.net.getId().then(val => console.log(val));
    web3.eth.net.getId().then(val => {
      switch (val) {
        case 1:           
        case 4: 
        case 97: 
        case 137:
        case 80001: 
        case 43114: 
        case 43113: 
          localStorage.removeItem('token')        
          location.href = '/'
          break;
        case 56: 
          setWalletID('BSC Mainnet')
          break;
        
        default:
          localStorage.removeItem('token')        
          location.href = '/'
      }
    })
  }

  useEffect(() => {
    if (window.electron) {
      window.electron.on('updateAvailable', () => {
        setUpdateAvailable(true)
      })
    }
  }, [])

  const [changeOnlineStatus] = useChangeOnlineStatusMutation()

  //Update online status every 15 seconds
  useEffect(() => {
    if (currentUser) {
      const id = setInterval(() => {
        changeOnlineStatus({
          variables: {
            input: { onlineStatus: OnlineStatus.Online }
          }
        })
      }, 2000)
      return () => clearInterval(id)
    }
  }, [currentUser])

  const { toggle: toggleDark, value: isDark } = useDarkMode()

  const downloadLink = getDownloadLink()
  const os = getOS()
  const [loginOpen, setLoginOpen, isCreateAccount, setCreateAccount] =
    useLoginDialog()

  const logout = () => {
    localStorage.removeItem('token')
    //location.reload()
    location.href = '/'
  }
  
  const SettingsWrapper = ({ children }) => (
    <Tippy content="Settings" offset={offset}>
      {children}
    </Tippy>
  )

  const SettingsInner = () => (
    <div onClick={() => setOpen(true)}>
      <IconSettings className="w-4.5 h-4.5 cursor-pointer text-tertiary" />
    </div>
  )

  return (
    <>
      {!!currentUser && <UserSettingsDialog open={open} setOpen={setOpen} />}

      <div className="flex items-center shadow-md px-3 bottom-0 h-5.5 dark:bg-gray-700 z-1000 bg-white">
        {currentUser ? (
          <>
            <UserAvatar size={4.5} className="mr-2" user={currentUser} />
            <div className="text-primary text-13 font-medium cursor-pointer">
              {currentUser.username}
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 ml-2" />            
          </>
        ) : (
          <div className="flex items-center text-primary text-13 font-medium">
            <div
              className="cursor-pointer hover:underline"
              onClick={() => {
                setCreateAccount(false)
                setLoginOpen(true)
              }}
            >
              Log In
            </div>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;
            <div
              className="cursor-pointer hover:underline"
              onClick={() => {
                setCreateAccount(true)
                setLoginOpen(true)
              }}
            >
              Create account
            </div>
          </div>
        )}

        {currentUser?.metamask && 
          <div className="ml-auto flex items-center text-tertiary text-13 font-medium">            
            <div className=".text-tertiary text-13 font-medium cursor-pointer ml-10">
              Network: {walletId}
            </div>
            {/* <div className=".text-tertiary text-13 font-medium cursor-pointer ml-10">
              NetworkType: {networkType}
            </div> */}
            <div className=".text-tertiary text-13 font-medium cursor-pointer ml-10">
              Wallet Id: {currentUser?.metamask}
            </div>
            <div className=".text-tertiary text-13 font-medium cursor-pointer ml-10">
              Balance: {balance}
            </div>
            {/* <IconKey className="w-4.5 h-4.5 text-tertiary cursor-pointer ml-10" onClick={closeMetaMask} /> */}
          </div>
        }
        <div className="ml-auto flex items-center space-x-4 text-primary">
          {os === 'Windows' && !window.electron && (
            <Tippy content="Download Comet for Desktop">
              <a
                className="block"
                target="_blank"
                rel="noopener noreferrer"
                href={downloadLink}
              >
                <IconDownload className="w-4.5 h-4.5 text-tertiary cursor-pointer" />
              </a>
            </Tippy>
          )}

          {/* <Tippy content={isDark ? 'Light Mode' : 'Dark Mode'}>
            <button
              className="text-tertiary cursor-pointer"
              onClick={() => toggleDark()}
            >
              {isDark ? (
                <IconLight className="w-5 h-5" />
              ) : (
                <IconDark className="w-5 h-5" />
              )}
            </button>
          </Tippy> */}

          <Tippy
            content={`${
              window.electron && updateAvailable
                ? 'Update available'
                : 'Up to date!'
            }`}
          >
            <div
              className={`flex items-center ${
                window.electron && updateAvailable ? 'cursor-pointer' : ''
              }`}
              onClick={() => {
                if (window.electron && updateAvailable) {
                  window.electron.restart()
                }
              }}
            >
              <div
                className={`text-xs font-medium ${
                  updateAvailable && window.electron
                    ? 'text-green-500'
                    : 'text-tertiary'
                }`}
              >
                Comet v{version}
              </div>

              {window.electron && updateAvailable && (
                <div className="pl-2">
                  <IconDownload className="w-4.5 h-4.5 text-green-500 cursor-pointer" />
                </div>
              )}
            </div>
          </Tippy>

          {/* <Tippy content="Search" offset={offset}>
            <div>
              <IconSearch className="w-4.5 h-4.5 cursor-pointer" />
            </div>
          </Tippy> */}

          {/* <Tippy content="Folders" offset={offset}>
            <div>
              <IconFolder className="w-4.5 h-4.5 cursor-pointer" />
            </div>
          </Tippy> */}

          {!!currentUser &&
            (width > 600 ? (
              <>
                <Tippy content="Notifications" offset={offset}>
                  <Link to="/inbox">
                    <IconBell className="w-4.5 h-4.5 cursor-pointer text-tertiary" />
                  </Link>
                </Tippy>
                <SettingsWrapper>
                  <SettingsInner />
                </SettingsWrapper>
                <IconLogout className="w-4.5 h-4.5 text-green-500 cursor-pointer" onClick={() => logout()}/>
              </>
            ) : (
              <>
                <Link to="/inbox">
                  <IconBell className="w-4.5 h-4.5 cursor-pointer text-tertiary" />
                </Link>
                <SettingsInner />
              </>
            ))}
        </div>
      </div>
    </>
  )
}
