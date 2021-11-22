export default function Page({
  children,
  header,
  rightSidebar,
  leftSidebar,
  hideRight = false
}) {
  return (
    <div className="flex flex-grow">
      {leftSidebar}
      <div className="flex flex-col flex-grow">
        {header}
        <div className="h-full">{children}</div>
      </div>
      {!hideRight && rightSidebar}
    </div>
  )
}
