import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {loggedin} = useContext(AuthContext)
    if(!loggedin){
        return <Navigate to={'/'} replace />
    }
  return (
   <>
    {children}
   </>
  )
}

export default ProtectedRoute