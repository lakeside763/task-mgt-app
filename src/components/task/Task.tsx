import { useQuery } from "@tanstack/react-query";
import TaskItem from "./TaskItem";
import { GetTasks } from '../../api/request';
import { TaskInterface } from "../../api/interface";
import { FC, useEffect } from "react";
import { ListBulletIcon } from "@heroicons/react/24/outline";

interface TaskProps {
  setTasksRefetch: (refetch: () => void) => void;
}

const Task: FC<TaskProps> = ({ setTasksRefetch }) => {
  const { isLoading, data: getTasks, refetch } = useQuery({
    queryKey: ['getTasks'],
    queryFn: GetTasks,
  });

  useEffect(() => {
    setTasksRefetch(refetch);
  }, [refetch, setTasksRefetch]);

  if (isLoading) return <div>Loading...</div>;

  const tasks = getTasks?.data || [];

  return (
    <div className='task flex-grow'>
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center h-full text-gray-300 mt-20">
          <div className="flex flex-col items-center">
            <ListBulletIcon className="w-10 h-10 mb-2" />
            <span>Empty task list</span>
          </div>
        </div>
      ) : (
        tasks.map((task: TaskInterface) => (
          <TaskItem task={task} key={task.id} />
        ))
      )}
    </div>
  );
};

export default Task;

