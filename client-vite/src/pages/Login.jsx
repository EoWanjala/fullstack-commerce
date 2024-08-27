import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../actions/userActions'
import { Myaccount } from '../components'


const Login = () => {
    const [username, setUsername] = useState()
    const [password, SetPassword] = useState()

    const userLoginReducer = useSelector((state) => state.userLoginReducer)
    const { error, userInfo } = userLoginReducer;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password))
    }
    if (!userInfo) {
        return (
            <div className='flex pt-20 max-w-7xl min-h-screen mx-auto pb-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 border md:border-gray-300 border-transparent shadow-lg rounded-lg ring-orange-600 w-full'>
                    <div className='w-full hidden md:flex bg-primary/80 rounded-l-lg items-center justify-center'>
                        <img src='./logo-mj.png' alt='Logo' className=''/>
                    </div>
                    <div>
                    {error && <div className="bg-red-500 text-white p-3 rounded mb-5 text-center">{error}</div>}
                    {/* {message && <div className="bg-red-500 text-white p-3 rounded mb-5 text-center">{message}</div>} */}
                        <form className='mx-5' onSubmit={submitHandler}>
                            <div className='mb-5 mt-10'>
                                <label className='block mb-2 text-sm font-medium text-secondary'>Username</label>
                                <input className='bg-gray-50 placeholder-gray-300 p-2.5 block border-gray-300 rounded-lg w-full shadow-md'
                                type='username'
                                placeholder='Enter username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className='mb-5 mt-10'>
                                <label className='block mb-2 text-sm font-medium text-secondary'>Password</label>
                                <input className='bg-gray-50 placeholder-gray-300 p-2.5 block border-gray-300 rounded-lg w-full shadow-md'
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => SetPassword(e.target.value)}/>
                            </div>
                            <button
                                type='submit'
                                className='text-white focus:ring-blue-800 hover:bg-blue-700 bg-blue-600 text-center px-5 py-2.5 sm:auto rounded-lg'
                            >
                                Sign In
                            </button>
                        </form>
                        <div className='flex flex-col text-light'>
                            <div className='mt-10 text-secondary text-xl mx-3'>
                                Do not have an account?
                            </div>
                            <div className='flex flex-row-reverse mt-3 mr-3'>
                                <Link to='/register'>
                                <button className='text-white bg-blue-600 hover:bg-blue-700 text-center rounded-lg p-3 sm:auto'>
                                    Register
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )
    }
    return (
        <div>
            <Myaccount />
        </div>
    )
  
}

export default Login
