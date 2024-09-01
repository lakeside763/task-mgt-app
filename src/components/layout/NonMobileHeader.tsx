import { Menu, MenuButton } from '@headlessui/react'
import { Bars2Icon, ChevronDownIcon } from '@heroicons/react/24/outline'

const NonMobileHeader = () => {
  return (
    <>
      {/* Non-Mobile Header */}
      <header className="header non-mobile-header">
          <div className="header-menu">
            <h1 className="text-3xl">Good Morning, Sullivan! 👋</h1>
            <p>Today, Wed 26 July 2023</p>
          </div>
          <div className="top-24 w-52 flex justify-end">
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-white py-2 px-4 text-md 
                font-semibold text-gray shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-white-700   
                data-[open]:bg-white-700 data-[focus]:outline-1 data-[focus]:outline-white">
                <ChevronDownIcon className="size-6 fill-black/60" />
                Today
              </MenuButton>
            </Menu>
            <Bars2Icon className='size-12 ml-2 rounded-md bg-white px-2 py-1' />
          </div>
        </header>
    </>
  )
}

export default NonMobileHeader
