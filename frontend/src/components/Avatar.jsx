import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Avatar({name}) {
    const {logout} = useContext(AuthContext)
  return (
    <div className="dropdown dropdown-end cursor-pointer">
        <div tabIndex={0}>
            <div className="avatar">
                <div className="w-8 rounded-full border text-center">
                    <p>{name}</p>
                </div>
            </div> 
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
            <li><a>Profile</a></li>
            <li><a onClick={logout}>Sign Out</a></li>
        </ul>
    </div>
  )
}

export default Avatar


