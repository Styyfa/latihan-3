import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { me } from '../../features/redux'

const Navbar = ({id}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

  return (
    <div className="w-full flex justify-between items-center py-5 px-16 bg-zinc-900">
        <div className="flex items-center gap-6 text-white">
            <Link to='/'>
                <h1 className='font-bold text-2xl'>Ai<span className="text-rose-600">Store</span></h1>
            </Link>
            <ul className='flex items-center gap-4'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>Features</Link></li>
                <li><Link to='/'>Cart</Link></li>
            </ul>
        </div>
        <div className="flex items-center gap-5">
            <input type="text" name="s" placeholder='search in here' />
            <Link to={`/profile/${id}`}>
                <div className="w-8 h-8 rounded-full bg-rose-600"></div>
            </Link>
        </div>
    </div>
  )
}

export default Navbar
