import { PlusIcon } from "@heroicons/react/24/outline"

const Sidebar = ({ sidebarVisible, openModal }: any) => {
  return (
    <>
      <aside className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-section">
          <h3>Private</h3>
          <ul className="list">
            <li className="sidebar-menu flex">
              <span className="emoji">🏠</span> 
              <span className="flex justify-between w-full">
                <span className='text-base mt-1.5 font-medium'>Home</span>
                <span>
                  <span className="count">4</span>
                </span>
              </span>
            </li>

            <li className="sidebar-menu flex">
              <span className="emoji">
                <div className='box black-box'></div>
              </span> 
              <span className="flex justify-between w-full">
                <span className='text-base mt-1.5 font-medium'>Completed</span>
                <span>
                  <span className="count">8</span>
                </span>
              </span>
            </li>

            <li className="sidebar-menu flex">
              <span className="emoji">
                <div className='box purple-box'></div>
              </span> 
              <span className="flex justify-between w-full">
                <span className='text-base mt-1.5 font-medium'>Personal</span>
                <span>
                  <span className="count">2</span>
                </span>
              </span>
            </li>

            <li className="sidebar-menu flex">
              <span className="emoji">
                <div className='box blue-box'></div>
              </span> 
              <span className="flex justify-between w-full">
                <span className='text-base mt-1.5 font-medium'>Work</span>
                <span>
                  <span className="count">0</span>
                </span>
              </span>
            </li>

            <li className="sidebar-menu">
              <span className="emoji">💪</span> 
              <span className="flex justify-between w-full">
                <span className='text-base mt-1.5 font-medium'>Diet</span>
                <span>
                  <span className="count">1</span>
                </span>
              </span>
            </li>

            <li className="sidebar-menu">
              <span className="emoji">📚</span> 
              <span className="flex justify-between w-full">
                <span className='text-base mt-1.5 font-medium'>List of Book</span>
                <span>
                  <span className="count">8</span>
                </span>
              </span>
            </li>
            <li className="sidebar-menu">
              <span className="emoji">🚗</span> 
              <span className="flex justify-between w-full">
                <span className='text-base mt-1.5 font-medium'>Road Trip</span>
                <span>
                  <span className="count">0</span>
                </span>
              </span>
            </li>
          </ul>
          <button className="create-btn" onClick={() => openModal('list')}>
            <span className="flex justify-between">
              <span className="flex">
                <PlusIcon className="size-5 mr-1 mt-0.5" />
                <span>Create new list</span>
              </span>
              <span className="flex">
                <div className="font-medium text-lg circle-icon">L</div>
              </span>
            </span>
          </button>
        </div>
        <div className="sidebar-section">
          <h3>Group</h3>
          <div className="group -mt-4">
            <div className="group-item">
              <div className="group-item-box"></div>
              <span className="text-xs font-medium"> Mobal Project </span>
              <span className="count text-xs">5 People</span>
            </div>
            <div className="group-item">
            <div className="group-item-box"></div>
              <span className="text-xs font-medium">Futur Project </span>
              <span className="count text-xs">4 People</span>
            </div>
          </div>
          <button className="create-btn" onClick={() => openModal('group')}>
            <span className="flex justify-between">
              <span className="flex">
                <PlusIcon className="size-5 mr-1 mt-0.5" />
                <span>Create new group</span>
              </span>
              <span className="flex">
                <div className="font-medium text-lg circle-icon">G</div>
              </span>
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
