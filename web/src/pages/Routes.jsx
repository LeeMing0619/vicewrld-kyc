import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import {
  matchPath,
  Route,
  Switch,
  useLocation,
  useParams
} from 'react-router-dom'
import NotFound from '@/pages/NotFound'
import FeedPage from '@/pages/feed/FeedPage'
import ExplorePage from '@/pages/explore/ExplorePage'
import InboxPage from '@/pages/inbox/InboxPage'
import DmPage from '@/pages/dm/DmPage'
import ServerPostsPage from '@/pages/server/ServerPostsPage'
import PostPage from '@/pages/post/PostPage'
import HomeSidebar from '@/pages/HomeSidebar'
import ProfileSidebar from '@/pages/ProfileSidebar'
import ServerList from '@/components/server/list/ServerList'
import BottomBar from '@/components/BottomBar'
import ServerSidebar from '@/pages/server/ServerSidebar'
import CreatorApplication from '@/components/CreatorApplication'
import CreatorProfile from '@/components/CreatorProfile'
import ChannelPage from '@/pages/server/channel/ChannelPage'
import ServerProvider from '@/providers/ServerProvider'
import { useCurrentServer } from '@/hooks/graphql/useCurrentServer'
import Particles from '@/components/Particles'
import { useServerUsersLazyQuery } from '@/graphql/hooks'

const serverRegex = `\\+[A-Za-z0-9_]+`
const usernameRegex = `@[A-Za-z0-9-_]+`

export default function Routes() {
  const [currentUser] = useCurrentUser()
  const { pathname } = useLocation()

  const matchedProfile = matchPath(pathname, {
    path: '/profile/:username'
  })

  const username = matchedProfile?.params?.username

  return (
    <Switch>
      <Route path="/">
        {!currentUser ? (
          <Particles />
        ) : (
          <Switch>
            <Route path="/creator-application">
              <CreatorApplication />
            </Route>
            <Route
              path={[
                '/',
                '/inbox',
                `/dm/:username(${usernameRegex})`,
                `/:server(${serverRegex})`,
                `/profile/:username`,
                `/:server(${serverRegex})/post/:postId`,
                `/:server(${serverRegex})/post/:postId/:slug`,
                '/explore'
              ]}
              exact
            >
              <div className="flex-grow">
                <div
                  className="flex items-stretch"
                  style={{ height: 'calc(100% - 1.375rem)' }}
                >
                  <ServerList hide />
                  <Route path="/explore">
                    <ExplorePage />
                  </Route>
                  <Route path={`/:server(${serverRegex})`}>
                    <ServerRoutes />
                  </Route>
                  <Route path={`/profile/:username`}>
                    <ProfileSidebar />
                    <CreatorProfile username={username} />
                  </Route>
                  <Route
                    exact
                    path={['/', '/inbox', `/dm/:username(${usernameRegex})`]}
                  >
                    <HomeSidebar />
                    <Route path="/" exact>
                      <InboxPage />
                    </Route>
                    <Route path="/inbox">
                      <InboxPage />
                    </Route>
                  </Route>
                </div>
                <BottomBar />
              </div>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        )}
      </Route>
    </Switch>
  )
}

function ServerRoutes() {
  const { server: s } = useParams()
  const serverName = s.substring(1)

  return (
    <ServerProvider name={serverName}>
      <ServerPages />
    </ServerProvider>
  )
}

function ServerPages() {
  const { server, loading } = useCurrentServer()
  const { hash, pathname } = useLocation()
  const channelName = hash.substring(1)

  const matchedPost = matchPath(pathname, {
    path: '/:server/post/:postId'
  })
  const postId = matchedPost?.params?.postId

  if (!server && !loading) {
    return <NotFound />
  }

  return (
    <>
      <ServerSidebar />
      <Route
        path={`/:server(${serverRegex})`}
        exact
        render={() => <ServerPostsPage />}
      />
      <Route
        path={[
          `/:server(${serverRegex})/post/:postId`,
          `/:server(${serverRegex})/post/:postId/:slug`
        ]}
      >
        <PostPage postId={postId} />
      </Route>
    </>
  )
}
