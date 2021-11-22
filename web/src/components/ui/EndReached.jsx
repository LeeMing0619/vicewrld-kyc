import { memo } from 'react'

export default memo(function EndReached({
  children = 'No more posts loaded!',
  className = 'h-48'
}) {
  return (
    <div className="flex flex-col items-center justify-center text-primary py-6 ">
      <img
        alt="cherry"
        src="/images/vice/cherry-logo.png"
        className={`object-contain animate-pulse select-none pointer-events-none ${className}`}
      />
      <div className="text-tertiary pt-3 text-lg orb-font">{children}</div>
    </div>
  )
})
