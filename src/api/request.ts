import { CreateTaskInterface, GroupInterface, ListInterface } from "./interface";

// const baseURL = "http://localhost:5134";
// const baseURL = "http://developement.eba-nmagbysq.us-east-1.elasticbeanstalk.com";
const baseURL = "https://task-mgt-app-sage.vercel.app/api/proxy";

export const GetTasks = async () => {
  const response = await fetch(`${baseURL}/getTasks`);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json();
}

export const CreateGroup = async (groupData: Partial<GroupInterface>) => {
  const response = await fetch(`${baseURL}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(groupData)
  });
  if (!response.ok) {
    throw new Error('Failed to create group')
  }
  return response.json();
}

export const GetGroups = async () => {
  return (await fetch(`${baseURL}/groups`)).json();
}

export const CreateList = async (listData: Partial<ListInterface>) => {
  const response = await fetch(`${baseURL}/lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(listData)
  });
  if (!response.ok) {
    throw new Error('Failed to create list')
  }
  return response.json();
}

export const GetLists = async () => {
  return (await fetch(`${baseURL}/lists`)).json();
}

export const CreateTask = async (taskData: CreateTaskInterface) => {
  const response = await fetch(`${baseURL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  });
  if (!response.ok) {
    throw new Error('Failed to create task')
  }
  return response.json()
}