import { Link, useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { oneUser, reset, updateUser } from "../features/redux";
import toast, { Toaster } from 'react-hot-toast';

const UpdateUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    const [username, setUsername] = useState('')

    const data = useSelector(state => state.auth.userData.user)
    const data2 = useSelector(state => state.auth.anotherData)

    useEffect(() => {
        dispatch(oneUser({id}))
    }, [])

    useEffect(() => {
        setUsername(data?.username)
    }, [data])

    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(updateUser({id: id, username: e.target.username.value}))
    }
    
    useEffect(() => {
        if(data2.isSuccess || data2.data.putUser?.msg) {
            navigate('/')
            dispatch(reset())
        } else if(data2.isError) {
            toast.error('Gagal Update', {position: "top-center"})
            dispatch(reset())
        }
    }, [data2.isSuccess, data2.isError])
  return (
    <div className="py-5 px-16">
        <Toaster />
        <div className="w-10 flex items-center text-lg justify-center h-10 bg-black text-white rounded-full mb-5 hover:bg-rose-600">
        <Link to={`/profile/${id}`}>
            <FaArrowLeft />
        </Link>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5 bg-zinc-900 rounded-lg mt-5 p-5">
            <div className="flex flex-col gap-3">
                <label htmlFor="username" className="capitalize text-white">Username :</label>
                <input type="text" name="username" id="username" onChange={(e) => handleChange(e)} value={username} placeholder="username" className='p-1 rounded-sm' />
            </div>
            <button type="submit" className="font-bold text=xl bg-rose-600 rounded-lg h-10">SEND</button>
        </form>
    </div>
  )
}

export default UpdateUser
