import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { set } from "mongoose";

dayjs.extend(utc);

function TaskFormPage() {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const { createTask, getTask, updateTask } = useTask();

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      const task = await getTask(params.id);
      console.log(task)
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("date", dayjs.utc(task.date).format('YYYY-MM-DD'));
    }
    if (params.id) {
      loadTask();
    }
  }, []);

  const onSubmit = handleSubmit(data => { 
    
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    }
    
    if (params.id) {
      updateTask(params.id, dataValid);
      console.log(data);
    } else {
      createTask(dataValid);
    }
    navigate('/tasks');
  } )
  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
    <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" placeholder="Title"
          {...register("title", { required: true })}
          autoFocus
          className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <label htmlFor="description">Description</label>
        <textarea rows="3" placeholder="Description"
          {...register("description", { required: true })}
          className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        <label htmlFor="date">Date</label>
        <input type="date" placeholder="date" {...register('date')} 
          className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <button className=" bg-indigo-500 px-3 py-2 rounded-md" type="submit">Save Task</button>

      </form>
      </div>
      </div>
  )
}

export default TaskFormPage