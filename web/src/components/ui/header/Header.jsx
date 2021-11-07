import { IconMenu } from '@/components/ui/icons/Icons'
import { useStore } from '@/hooks/useStore'

export default function Header({
  children,
  className,
  icon,
  title,
  showDivider = false,
  darkBg = false
}) {
  const [setShowLeftSidebar] = useStore(s => [s.setShowLeftSidebar])
  return (
    <header
      id="header"
      style={{ backgroundColor: darkBg ? '#090909' : '' }}
      className={`h-${
        darkBg ? 16 : 12
      }  min-h-[3rem] items-center bg-white dark:bg-gray-750 ${
        !darkBg && 'border-b dark:border-gray-800'
      } shadow flex`}
    >
      <div
        className={`flex items-center font-semibold text-base leading-5 text-primary pl-4 pr-4 ${
          showDivider ? 'border-r dark:border-gray-700 mr-4' : ''
        }`}
      >
        <IconMenu
          className="md:hidden mr-3 w-5 h-5 text-tertiary"
          onClick={() => setShowLeftSidebar(true)}
        />
        <div className="text-tertiary mr-3">{icon}</div>
        {title}
      </div>
      <div className="flex-grow flex items-center min-w-0 pr-4">{children}</div>
      {/* <div className="flex w-60 min-w-[15rem] pr-4">
        <HeaderSearchBar />
      </div> */}
    </header>
  )
}
