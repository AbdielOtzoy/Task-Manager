import { createContext, useContext, useState } from "react";
import { createTaskRequest, deleteTasksRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from "../api/tasks";

const TaskConext = createContext();

export const useTask = () => {
    const context = useContext(TaskConext);

    if (!context) {
        throw new Error("useTask must be used within a TaskProvider");
    }

    return context;
}

export function TaskProvider({ children }) {

  const [tasks, setTasks] = useState([]);
  
  
  const createTask = async (task) => {
    const res = await createTaskRequest(task);
  }

  const getTasks = async () => { 
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
      
    } catch (error) {
      
      console.log(error);
    }
  }

  const deleteTask = async (id) => { 
    try {
      const res = await deleteTasksRequest(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  
  }

  const getTask = async (id) => { 
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.log(error);
    }
  }
  return (
      <TaskConext.Provider value={
      {
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask
      }
    }>
      {children}
    </TaskConext.Provider>
  )
}