import ExploreSidebar from '@/pages/explore/ExploreSidebar'
import ServerInfoCard from '@/components/server/ServerInfoCard'
import { useStore } from '@/hooks/useStore'
import Page from '@/components/ui/page/Page'
import PageView from '@/components/ui/page/PageView'
import { usePublicServersQuery } from '@/graphql/hooks'
import EndReached from '@/components/ui/EndReached'
import { Helmet } from 'react-helmet-async'
import Header from '@/components/ui/header/Header'
import { IconExplore } from '@/components/ui/icons/Icons'
import Particles from '@/components/Particles'
import PulsingBox from '@/components/ViceHeader/UI/NeonPulsing/Box'
import { mainColor } from '../../vars/colors'
import { useState } from 'react'

export default function ExplorePage() {
  const [exploreCategory, exploreSort] = useStore(s => [
    s.exploreCategory,
    s.exploreSort
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const { data } = usePublicServersQuery({
    variables: {
      sort: exploreSort,
      category:
        exploreCategory && exploreCategory !== 'Featured'
          ? exploreCategory
          : null,
      featured: exploreCategory === 'Featured'
    },
    fetchPolicy: 'cache-and-network'
    //nextFetchPolicy: 'cache-first'
  })
  const servers = data?.publicServers ?? []

  return (
    <Page
      leftSidebar={<ExploreSidebar />}
      header={
        <Header title="Explore" icon={<IconExplore className="w-5 h-5" />} />
      }
    >
      <Helmet>
        <title>Explore Rooms – Vicewrld</title>
      </Helmet>
      <PageView>
        <div
          className="md:px-8 md:py-8 px-0 py-0"
          style={{ position: 'relative', height: '100%' }}
        >
          <Particles fewer />
          <div
            className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5"
            style={{ paddingBottom: 80 }}
          >
            {servers
              .filter(({ name }) => name !== 'Comet')
              .map(server => (
                // <PulsingBox color={mainColor} hoverOnly>
                <ServerInfoCard server={server} key={server.id} />
                // </PulsingBox>
              ))}
          </div>
          {!servers.length && <EndReached>Nothing here yet!</EndReached>}
        </div>
      </PageView>
    </Page>
  )
}
