import { useEffect } from "react";
import { useTask } from "../context/TaskContext"
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
function TaskPage() {

  const { getTasks, tasks } = useTask();
  const { user } = useAuth();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
        <h1 className="text-2xl font-bold text-center">You don't have tasks yet</h1>
        <Link to='/add-task' className=" bg-indigo-500 px-4 py-1 rounded-sm">Add a task</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center gap-3 items-center">
      <h1 className="text-2xl font-bold text-center" >{user.username}'s Tasks:</h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 w-5/6">
        {
          tasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))
        }
      </div>
    </div>
  )
}

export default TaskPage