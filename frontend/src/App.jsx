
import { Routes, Route,  } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import NotFound from './pages/not-found'
import Docs from './pages/docs'

// Visitor
import IndexPage from './pages/visitor-view/Index'
import VisitorLayout from './components/visitor-view/layout'

// tutor
import TutorDashboard from './pages/tutor-view/Dashboard'
import TutorLayout from './components/tutor-view/layout'
import TutorProfile from './pages/tutor-view/Profile'

// student
import StudentLayout from './components/student-view/Layout'
import StudentDashboard from './pages/student-view/dashboard'
import StudentProfile from "./pages/student-view/profile";


// utils
import CheckAuth from './components/common/check-auth'
import { Toaster } from './components/ui/toaster'

// auth pages
import AuthRegister from './pages/auth/Signup'
import AuthLogin from './pages/auth/LoginPage'
import LogoutPage from './pages/auth/LogoutPage'

//contexts
// import { useAppLoadingContext } from './contexts'
// import Loader from './components/common/Loader'
import { useLoading } from './contexts/LoadingContext'
import Loader from './components/common/Loader'
import { useAuth } from './contexts/AuthContext'
//import { useEffect } from 'react'




function App() {
  const { user, isAuthenticated } = useAuth();
  
  const {loading} = useLoading();
    
    if (loading) {
        return <Loader />
    }
  
  

  return (
      //loading ? <Loader /> :
      <div className="flex flex-col overflow-hidden bg-white">
      <Toaster />
      <Routes>
        {/* visitor route */}
        <Route path='/' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}><VisitorLayout /></CheckAuth>
      }>
        <Route path='/' element={<IndexPage />}></Route>
        <Route path='/docs' element={<Docs />}></Route>
      </Route>
        
        
      {/* auth route */}
      <Route path='/auth' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>
      }>
        <Route path='login' element={<AuthLogin />}></Route>
        <Route path='register' element={<AuthRegister />}></Route>
        <Route path="logout" element={<LogoutPage />} />
      </Route>


      {/* tutor route */}
      <Route path='/tutor' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}><TutorLayout /></CheckAuth>
      }>
        <Route path='dashboard' element={<TutorDashboard />}></Route>
        <Route path='profile' element={<TutorProfile />}></Route>
      </Route>

      {/* student route */}
      <Route path='/student' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}><StudentLayout /></CheckAuth>
      }>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>
      <Route path='*' element={<NotFound />}></Route>
        
      </Routes>
    </div>
  )
}

export default App
