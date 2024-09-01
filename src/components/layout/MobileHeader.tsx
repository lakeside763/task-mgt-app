import { Bars3Icon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/outline"

const MobileHeader = ({ toggleSidebar, sidebarVisible}: any) => {
  return (
    <>
      <header className="header mobile-header">
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          {sidebarVisible 
            ? <XMarkIcon className="size-8 mr-5" />
            : <Bars3Icon className="size-7 mr-5" />}
        </button>
        <div>
          <h1 className="text-lg mt-1">Good Morning! 👋</h1>
        </div>
      </header>
    </>
  )
}

export default MobileHeader
