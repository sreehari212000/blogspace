import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Avatar from './Avatar'
import AuthContext from '../context/AuthContext'

function Navbar() {
    const {loggedin, user} = useContext(AuthContext)
  return (
    <div>
        <nav className='border-b border-gray-600 shadow-lg py-3  px-3 md:px-10 flex justify-between'>
            <h1 className='text-white text-2xl italic'>
                <Link to={'/'}>BLOGIFY</Link>
            </h1>
            {
                loggedin ? (
                    <div className='text-white flex items-center gap-10'>
                        <NavLink to={'/add-new'}>New</NavLink>
                        <Avatar name={user?.name.at(0)}/>
                    </div>
                ) : (
                    <div className='text-white flex gap-4'>
                        <NavLink to={'/signin'} className='active:text-green-300'>Sign In</NavLink>
                        <NavLink to={'/signup'} className='active:text-green-300'>Sign Up</NavLink>
                    </div>
                )
            }
        </nav>
        <Outlet />
    </div>
  )
}

export default Navbar