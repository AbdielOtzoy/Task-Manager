import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import TaskFormPage from './pages/TaskFormPage.jsx';
import TaskPage from './pages/TaskPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className=' container mx-auto px-10'>
            <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route element={<ProtectedRoute/>}>
                <Route path="/add-task" element={<TaskFormPage/>} />
                <Route path="/tasks" element={<TaskPage/>} />
                <Route path="/tasks/:id" element={<TaskFormPage/>} />
              </Route>
            </Routes>
          </main>
      </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App