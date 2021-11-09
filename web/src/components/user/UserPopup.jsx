import { useState } from 'react';
import Popup from '@/components/ui/Popup'
import UserAvatar from '@/components/user/UserAvatar'
import { useStore } from '@/hooks/useStore'
import ctl from '@netlify/classnames-template-literals'
import { useHistory } from 'react-router-dom'
import { RelationshipStatus, useCreateFriendRequestMutation } from '@/graphql/hooks';

const titleClass = ctl(`
  px-4
  h-10
  placeholder-tertiary
  dark:bg-gray-650
  bg-gray-100
  rounded
  text-sm
  text-primary
  w-full
  focus:outline-none
`)

export default function UserPopup({
  user,
  role,
  children,
  placement = 'right'
}) {
  const [createFriendRequest] = useCreateFriendRequestMutation()
  const [message, setMessage] = useState('');
  const history = useHistory();
  const setDialogUserId = useStore(s => s.setDialogUserId)
  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      // following
      let userId = user.id;
      createFriendRequest({
        variables: { input: { userId } },
        optimisticResponse: {
          createFriendRequest: {
            ...user,
            relationshipStatus: RelationshipStatus.Following
          }
        }
      })
      // navigate to DM page
      history.push({
        pathname: '/dm/@' + user.username,
        state: { message }
      })
    }
  }
  if (!user) return children
  // return <>{children}</>
  return (
    <>
      <Popup
        className="w-64"
        placement={placement}
        render={close => (
          <div className="w-full relative rounded-md shadow-lg duration-200 transform transition z-50 w-64">
            <div className="p-3 flex flex-col items-center dark:bg-gray-850 rounded-t-md bg-white">
              <div className="group relative">
                <UserAvatar
                  user={user}
                  size={20}
                  showOnline
                  // className="dark:bg-gray-700 select-none"
                  className="dark:bg-gray-700 cursor-pointer select-none"
                  dotClassName="ring-5 w-4 h-4 dark:ring-gray-850 ring-white"
                />

                <div
                  onClick={() => {
                    close()
                    setDialogUserId(user.id)
                  }}
                  className="cursor-pointer bg-black bg-opacity-50 transition rounded-full absolute whitespace-nowrap inset-0 flex items-center justify-center text-9 uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100"
                >
                  View Profile
                </div>
              </div>

              <div className="mt-3 text-base">
                <span className="font-semibold text-primary">
                  {user.username}
                </span>
              </div>
            </div>

            <div className="p-4 dark:bg-gray-800 rounded-b-md bg-gray-50">
              {role && (
                <div>
                  <div className="text-11 font-semibold uppercase tracking-widest text-secondary pb-2">
                    Roles
                  </div>
                  <div
                    style={{ borderColor: role.color }}
                    className={`text-xs text-secondary font-medium pl-1 py-1 pr-2 leading-none rounded-full border inline-flex items-center ${
                      role.color ? '' : 'dark:border-gray-700 border-gray-300'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mr-1 ${
                        !role.color ? 'dark:bg-gray-700 bg-gray-300' : ''
                      }`}
                      style={{ backgroundColor: role.color }}
                    />
                    {role.name}
                  </div>
                  <div className="text-11 font-semibold uppercase tracking-widest text-secondary pt-8 pb-2">
                    <input
                      autoComplete="off"
                      maxLength={300}
                      className={titleClass}
                      placeholder={'Messaage @' + user.username}
                      id="messaage"
                      onChange={onChangeMessage}
                      onKeyPress={onKeyPress}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      >
        {children}
      </Popup>
    </>
  )
}
