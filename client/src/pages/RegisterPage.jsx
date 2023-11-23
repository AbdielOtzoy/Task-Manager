import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { singup, isAuthenticated, errors: AuthErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async values => {
          singup(values);
    });

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
    
      {
        AuthErrors.map((error, i) => (
          <div key={i} className='bg-red-500 p-2 text-white'>{error}</div>
        
        ))
        }
        <h1 className='text-2xl text-center text-white font-bold '>Register</h1>

      <form onSubmit={onSubmit}>
        <input type="text" {...register("username", { required: true })} 
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder='username'
        />
        {
          errors.username && <p className='text-red-500'>username is required</p>
        }
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
        <button className="bg-indigo-500 px-4 py-1 rounded-sm" type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to='/login' className='text-blue-400'>Login</Link>
        </p>
      </div>
      </div>
  )
}

export default RegisterPage