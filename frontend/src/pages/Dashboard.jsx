import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/navbar/Navbar"
import {me} from '../features/redux.js'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector(state => state.auth.userData)

  useEffect(() => {
    toast.success('Login Success', {position: 'top-center'})
    dispatch(me())
  }, [dispatch])

  useEffect(() => {
    if(data.isError) {
      navigate('/login')
    }
  }, [data.isError, navigate])

  return (
    <div>
      <Toaster />
      <Navbar id={data?.user?.id} />
    </div>
  )
}

export default Dashboard
