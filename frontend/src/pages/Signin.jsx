import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import {useNavigate} from "react-router-dom"

function Signin() {
    const [authData, setAuthData] = useState({email:'', password:''})
    const [error, setError] = useState('')
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()


    const handleInputChange = (e)=>{
        setAuthData({...authData, [e.target.name]:e.target.value})
    }

    const handleSignIn = async(e)=>{
        e.preventDefault()

        if(!authData.email || !authData.password){
            setError('Please enter all the fields')
            return
        }
        
        try {
            const response = await fetch('http://localhost:8000/api/users/signin',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authData)
            })
            const result = await response.json()
            if(result.status === 'Fail'){
                throw new Error('Invalid username or password')
            }  
            login(result.token, result.userId)
            setAuthData({email: '', password: ''})
            navigate('/')
                     
        } catch (error) {
            console.log(error);
            setError(error.message)
        }  
    }

    useEffect(()=>{
        const timeOut = setTimeout(() => {
            setError('')
        }, 3000);
        return () => clearTimeout(timeOut)
    }, [error])

  return (

    <div className="w-[80%] md:w-[60%] 2xl:w-[20%] mx-auto mt-20 lg:mt-40 flex flex-col gap-5 p-5 py-20 lg:px-10 shadow-lg bg-white bg-opacity-5 rounded-md">

        <h1 className='text-2xl text-center'>Login</h1>
        {error && <p className='text-xs text-center text-red-600'>{error}</p>}
        <div>
            <label className="input input-bordered flex items-center gap-2">Email
                <input type="email" className="grow" name='email' placeholder="sample@gmail.com" required value={authData.email} onChange={handleInputChange} />  
            </label>
        </div>

        <div>
            <label className="input input-bordered flex items-center gap-2">Password
                <input type="password" className="grow" name='password'  required value={authData.password} onChange={handleInputChange}  />  
            </label>
        </div>

        <button className="btn" type='submit' onClick={handleSignIn}>Sign In</button>

    </div>
  )
}

export default Signin