import { createContext, useState, useEffect } from 'react'
import { useServerQuery, useServerUsersLazyQuery } from '@/graphql/hooks'

export const ServerContext = createContext({
  server: null,
  loading: true,
  users: []
})

export default React.memo(function ServerProvider({ children, name }) {
  const [users, setUsers] = useState([])
  const [server, setServer] = useState(undefined)
  const [hasSetUsers, setHasSetUsers] = useState(false)
  const { data } = useServerQuery({
    variables: {
      name
    },
    skip: !name,
    fetchPolicy: 'network-only'
  })

  const { data: usersData } = useServerUsersLazyQuery({
    variables: { serverId: server?.id },
    skip: !server,
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    setServer(data?.server)
  }, [data])

  useEffect(() => {
    setUsers(usersData?.serverUsers ?? [])
  }, [usersData])

  return (
    <ServerContext.Provider
      value={{
        server,
        loading: false,
        users
      }}
    >
      {children}
    </ServerContext.Provider>
  )
})
