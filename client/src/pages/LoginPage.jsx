import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const { singin, isAuthenticated, errors: AuthErrors } = useAuth();

  const navigate = useNavigate();

    useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(data => {
    singin(data);
  })
  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {
        AuthErrors.map((error, i) => (
          <div key={i} className='bg-red-500 p-2 text-white text-center m-2 rounded-md'>{error}</div>
        
        ))
      }
        
        <h1 className='text-2xl text-center text-white font-bold '>Login</h1>
      
        <form onSubmit={onSubmit}>
          
          <input type="email" {...register("email", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='email'
          />
          {
            errors.email && <p className='text-red-500'>email is required</p>
          }
          <input type="password" {...register("password", { required: true })} 
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='password'
          />
          {
            errors.password && <p className='text-red-500'>password is required</p>
          }
          <button type="submit"
          className="bg-indigo-500 px-4 py-1 rounded-sm"
          >Login</button>
        </form>

        <p>
          Don't have an account? <Link to='/register' className='text-blue-400'>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage