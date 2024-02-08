import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import axios from 'axios'
import Profile from './pages/Profile'
import UpdateUser from './pages/UpdateUser'

axios.defaults.withCredentials = true

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/profile/:id' element={<Profile />}></Route>
        <Route path='/updateuser/:id' element={<UpdateUser />}></Route>
      </Routes>
    </div>
  )
}

export default App
