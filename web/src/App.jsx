import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Routes from '@/pages/Routes'
import { ApolloProvider } from '@apollo/client/react'
import ResponsiveToaster from '@/components/ui/ResponsiveToaster'
import CustomDragLayer from '@/components/ui/CustomDragLayer'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import TitleBar from '@/components/ui/electron/titlebar/TitleBar'
import { getOS } from '@/utils/getOS'
import { apolloClient } from '@/graphql/apolloClient'
import ContextMenuProvider from '@/providers/ContextMenuProvider'
import LoginDialog from '@/components/LoginDialog'
import UserDialog from '@/components/user/UserDialog'
import UserProvider from '@/providers/UserProvider'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { mainColor, secondaryColor } from '@/vars/colors'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useState, useEffect } from 'react'

export default function App() {
  const isMac = getOS() === 'Mac OS'
  const Router = window.electron ? HashRouter : BrowserRouter

  const { toggle: toggleDark, value: isDark } = useDarkMode()

  const GlobalStyle = createGlobalStyle`
  :root {
  --primary-color: ${mainColor};
  --secondary-color: ${secondaryColor};
  }`

  const theme = {
    colors: {
      primary: mainColor,
      secondary: secondaryColor
    }
  }

  useEffect(() => {
    if (!isDark) toggleDark()
  }, [isDark])

  return (
    <ApolloProvider client={apolloClient}>
      <HelmetProvider>
        <Helmet>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/logos/logo_icon.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Vicewrld – find your vice</title>
        </Helmet>
        <UserProvider>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Router>
              <ContextMenuProvider>
                <DndProvider
                  backend={TouchBackend}
                  options={{
                    enableTouchEvents: false,
                    enableMouseEvents: true
                  }}
                >
                  <ResponsiveToaster />
                  <CustomDragLayer />
                  {window.electron && !isMac && <TitleBar />}
                  <LoginDialog />
                  <UserDialog />
                  <div
                    style={
                      window.electron
                        ? { height: isMac ? '100%' : 'calc(100% - 1.375rem)' }
                        : { height: '100%' }
                    }
                    className="flex"
                  >
                    <Routes />
                  </div>
                </DndProvider>
              </ContextMenuProvider>
            </Router>
          </ThemeProvider>
        </UserProvider>
      </HelmetProvider>
    </ApolloProvider>
  )
}
