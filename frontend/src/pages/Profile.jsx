import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { deleteUser, logOut, oneUser } from "../features/redux";

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    const data = useSelector(state => state.auth.userData.user)

    useEffect(() => {
        dispatch(oneUser({id}))
    }, [])

  const handleDelete = () => {
      const check = confirm('yakin?')
      if(check) {
        dispatch(deleteUser({id}))
        navigate('/login')
        dispatch(reset())
      } else if(!check) {
        alert('Gagal Menghapus Account!!!')
      }
  }

  const handleLogout = () => {
      const check = confirm('yakin?')
      if(check) {
        dispatch(logOut({id}))
        navigate('/login')
        dispatch(reset())
      } else if(!check) {
        alert('Gagal Logout!!!')
      }
  }

  return (
    <div className="py-5 px-16">
      <div className="w-10 flex items-center text-lg justify-center h-10 bg-black text-white rounded-full mb-5 hover:bg-rose-600">
        <Link to='/'>
            <FaArrowLeft />
        </Link>
      </div>
      <div className="p-16 w-full h-[360px] flex items-center rounded-lg bg-rose-600">
        <div className="w-[23%] h-[100%] bg-black rounded-full"></div>
        <div className="w-[83%] ml-10">
            <h1 className="text-2xl font-bold capitalize">{data?.username}</h1>
            <p className="mt-3 font-semibold">{data?.email}</p>
        </div>
      </div>
      <div className="w-full bg-rose-600 rounded-lg overflow-hidden mt-5">
        <ul>
          <li className="p-3 border-b-2 border-black hover:border-white hover:bg-black hover:text-white">
            <Link to='/register'>Create New User</Link>
          </li>
          <li className="p-3 border-b-2 border-black hover:border-white hover:bg-black hover:text-white">
            <Link to={`/updateuser/${id}`}>Update User</Link>
          </li>
          <li className="p-3 border-b-2 border-black hover:border-white hover:bg-black hover:text-white"><button type="button" onClick={handleDelete}>Delete User</button></li>
          <li className="p-3 border-b-2 border-black hover:border-white hover:bg-black hover:text-white"><button type="button" onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </div>
  )
}

export default Profile
