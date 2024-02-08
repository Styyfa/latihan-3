import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../features/redux.js'
import Loading from '../components/loading/Loading.jsx'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const data = useSelector(state => state.auth.userData)
    console.log(data)

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(login({email: e.target.email.value, password: e.target.password.value}))
    }

    useEffect(() => {
        if(data.isSuccess || data.user) {
            navigate('/')
            dispatch(reset())
        } else if(data.isError) {
            toast.error('Login Failed', {position: 'top-center'})
            dispatch(reset())
        }
    }, [data.isSuccess, data.user, data.isError])

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
        {data.isLoading === true ? <Loading /> : ''}
        <Toaster />
        <div className="p-5 bg-zinc-900 w-[450px] rounded-lg">
            <h1 className="text-center font-bold capitalize text-white text-2xl mb-5">Login</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
                <label htmlFor="email" className="capitalize text-white">Email :</label>
                <input type="email" name="email" id="email" placeholder="email" className='p-1 rounded-sm' />
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="password" className="capitalize text-white">Password :</label>
                <input type="password" name="password" minLength='5' id="password" placeholder="*****" className='p-1 rounded-sm' />
            </div>
            <p className='text-white text-center'>Belum punya account?<Link to='/register' className='text-sky-600 underline'>click di sini</Link></p>
            <button type="submit" className="font-bold text=xl bg-rose-600 rounded-lg h-10">SEND</button>
        </form>
        </div>
    </div>
  )
}

export default Login
