export interface TaskInterface {
  id: string
  listId: string
  name: string
  description: string
  priority: string
  status: string
  date: string
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
}

export interface GroupInterface {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface ListInterface {
  id: string
  groupId: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskInterface {
  listId: string
  name: string
  description: string
  priority: string
  date: string
  startTime: string
  endTime: string
}
