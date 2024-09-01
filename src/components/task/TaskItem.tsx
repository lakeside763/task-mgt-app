import { Checkbox, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ClockIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { TaskInterface } from '../../api/interface'
import { FC } from 'react'

interface TaskItemProps {
  task: TaskInterface
}

const TaskItem: FC<TaskItemProps>= ({ task }) => {
  return (
    <>
      <div className="task-list mb-1">
        <div className="task bg-white flex flex-start">
          <Checkbox
                className="group block mt-1.5 size-6 rounded border bg-white data-[checked]:bg-blue-500"
            >
            {/* Checkmark icon */}
            <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
              <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Checkbox>
          <div className="flex ml-3 justify-between w-full">
            <span className='text-base mt-1.5'>{task?.name}</span>
            <div className="flex">
              <div className="flex bg-gray-100 rounded-md p-1">
                <ClockIcon className="size-5 mt-1" />
                <span className="ml-2 mt-0.5 text-base">
                  {((task?.startTime || "00:00").replace(":", "."))} 
                  {" - "}
                  {((task?.endTime || "00:00").replace(":", "."))} 
                </span>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="ml-1 bg-gray-100 rounded-md p-2">
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-32 origin-top-right z-[1005] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } align-left group flex w-full items-center pl-3 py-2 text-sm text-gray-700`}
                      >
                        <div className="flex justify-start">
                          <PencilIcon className="w-4 h-4 mt-0.5 mr-2" />
                          <span>Update</span>
                        </div>
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } group flex w-full items-center pl-3 py-2 text-sm text-gray-700`}
                      >
                        <div className="flex justify-start">
                          <TrashIcon className="w-4 h-4 mt-0.5 mr-2" />
                          Delete
                        </div>
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskItem
