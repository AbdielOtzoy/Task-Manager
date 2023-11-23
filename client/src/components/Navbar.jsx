import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";


function Navbar() {

    const { isAuthenticated, logout, user } = useAuth();
  return (
      <nav className=" bg-zinc-700 my-3 flex justify-between py-5 px-3 rounded-lg">
          <Link to={
                isAuthenticated ? '/tasks' : '/'
          }><h1 className=" text-2xl font-bold">Task Manager</h1></Link>
          <ul className="flex gap-x-3">
              {
                  !isAuthenticated ? (
                      <> 
                    
                              
                    <li>
                        <Link className=" bg-indigo-500 px-4 py-1 rounded-sm" to='/login'>Login</Link>
                    </li>
                    <li>
                        <Link className=" bg-indigo-500 px-4 py-1 rounded-sm" to='/register'>Register</Link>
                    </li>
                   </>
                
                  ) : (
                    <>
                    <li>
                        <Link to='/add-task' className=" bg-indigo-500 px-4 py-1 rounded-sm">Add a task</Link>
                    </li>
                    <li>
                        <Link to='/tasks'>Tasks</Link>
                    </li>    
                    <li>
                    </li>      
                        <Link to='/' onClick={() => logout()}>Log out</Link>
                    </>
                  )
            }
          </ul>
    </nav>
  )
}

export default Navbar