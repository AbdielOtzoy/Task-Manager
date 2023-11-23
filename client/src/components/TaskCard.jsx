import { useTask } from "../context/TaskContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {

  const { deleteTask } = useTask();
  return (
    <div className=" bg-zinc-800 max-w-sm w-full p-5 rounded-md">
        <h1 className=" text-2xl font-bold overflow-hidden break-words whitespace-pre-line" >{task.title}</h1>
      <p className=" text-slate-300 overflow-hidden break-words whitespace-pre-line">{task.description}</p>
      <p className=" text-slate-300">{dayjs(task.date).utc().format('DD/MM/YYYY')}</p>
        <div>
        <Link to={`/tasks/${task._id}`}>
            <button className=" bg-slate-300 text-zinc-800 rounded-md px-2 py-1 mt-2"
            onClick={() => {
              console.log(task)
            }}
            >Edit</button>
        </Link>
        <button className=" bg-red-400 text-zinc-800 rounded-md px-2 py-1 mt-2 ml-2"
          onClick={() => {
            deleteTask(task._id);
            console.log(task)
          }}
        >Delete</button>
        </div>  
    </div>
  )
}

export default TaskCard