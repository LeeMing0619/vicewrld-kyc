import { Fragment } from 'react'
import Dialog from '@/components/ui/dialog/Dialog'

export default function StyledDialog({
  children,
  buttons,
  metamaskButtons,
  open,
  close,
  closeOnOverlayClick,
  onSubmit,
  small = false,
  large = false,
  noOpacity = false,
  show,
  metamaskButtonClick,
  createAccount
}) {
  return (
    <Dialog
      isOpen={open}
      close={close}
      closeOnOverlayClick={closeOnOverlayClick}
      noOpacity={noOpacity}
    >
      <form
        onSubmit={onSubmit}
        className={`md:rounded-lg dark:bg-gray-800 min-w-screen w-full relative text-left bg-white text-white ${
          !small && !large ? 'md:max-w-lg' : ''
        } ${small ? 'md:max-w-sm' : ''} ${large ? 'md:max-w-screen-lg' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {children}
        {!!buttons && (
          <>
            {!show && <div className="md:rounded-b-lg h-9" />}
            {!show && !createAccount && <div className="absolute right-5 left-5 bottom-24 transform flex items-center space-x-3 justify-center h-9">
              {(buttons.type === Fragment
                ? buttons.props.children
                : [buttons]
              ).map((button, index) => (
                !show && 
                <div key={index} className="dark:bg-gray-800 rounded">
                  {button}
                </div>
              ))}
            </div>  
            }      
            {!show && createAccount && <div className="absolute right-5 left-5 bottom-4 transform flex items-center space-x-3 justify-center h-9">
              {(buttons.type === Fragment
                ? buttons.props.children
                : [buttons]
              ).map((button, index) => (
                !show && 
                <div key={index} className="dark:bg-gray-800 rounded">
                  {button}
                </div>
              ))}
            </div>  
            }          
          </>
        )}
        {!show && !createAccount && <hr className="mt-9 mb-6" style={{border: '0', height: '1px', backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255,255, 0.75), rgba(255, 255, 255, 0))'}}></hr>}
        {!!metamaskButtons && !createAccount && (
          <div>
          {(metamaskButtons.type === Fragment
            ? metamaskButtons.props.children
            : [metamaskButtons]
          ).map((metamaskButton, index) => (
            !show && 
              <div key={index} className="dark:bg-gray-800 rounded flex justify-center pb-4" onClick={metamaskButtonClick}>
                {metamaskButton}
              </div>             
          ))}
          </div>
        )}
      </form>
    </Dialog>
  )
}
