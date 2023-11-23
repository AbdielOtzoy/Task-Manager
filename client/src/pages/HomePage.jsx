import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className=' flex flex-col justify-center items-center h-[calc(100vh-100px)]'>
      <h1 className=" text-2xl font-bold" >Work smarter with a task manager</h1>
      <p>Organize your life with our task manager</p>
      <Link to='/register' className="bg-indigo-500 py-2 px-3 rounded-md">Get started</Link>
    </div>
  )
}

export default HomePage