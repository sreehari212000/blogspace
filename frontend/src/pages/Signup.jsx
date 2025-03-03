import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    
    const [authdata, setAuthdata] = useState({name: '', email: '', password:'', confirmpassword: ''})
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleInputChange = (e)=>{
        setAuthdata({...authdata, [e.target.name]: e.target.value})
    }
    
    const handleSignup = async(e)=>{
        e.preventDefault()
        if(!authdata.name || !authdata.email || !authdata.password || !authdata.confirmpassword){
            setError('Please fill in all the fields!')
            return
        }
        if(authdata.password !== authdata.confirmpassword){
            setError('Password and confirm password do not match!')
            return
        }

        try {
            const response = await fetch('http://localhost:8000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: authdata.email, name: authdata.name, password: authdata.password})
            })
            const result = await response.json()
            if(result.status === 'Fail'){
                throw new Error('Error creating user')
            }
            navigate('/signin')
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
        
    }

    useEffect(()=>{
        const timeout = setTimeout(() => {
            setError('')
        }, 3000);
        return ()=> clearTimeout(timeout)
    }, [error])


  return (
    <div className="w-[80%] md:w-[60%] 2xl:w-[20%]  mx-auto mt-20 lg:mt-40 flex flex-col gap-5 p-5  md:p-10 bg-white bg-opacity-5 rounded-lg">
        <h1 className="text-center text-2xl">Sign Up</h1>
        {error && <p className='text-xs text-center text-red-600'>{error}</p>}
        <div>
            <label className="input input-bordered flex items-center gap-2">Name
                <input type="text" name="name" required className="grow" onChange={handleInputChange} placeholder="Sreehari" />  
            </label>
        </div>

        <div>
            <label className="input input-bordered flex items-center gap-2">Email
                <input type="email" name="email" className="grow" onChange={handleInputChange} placeholder="sample@gmail.com" />  
            </label>
        </div>

        <div>
            <label className="input input-bordered flex items-center gap-2">Password
                <input type="password" name="password" className="grow" onChange={handleInputChange} placeholder="******" />  
            </label>
        </div>

        <div>
            <label className="input input-bordered flex items-center gap-2">Confirm 
                <input type="password" name="confirmpassword" className="grow" onChange={handleInputChange} placeholder="******" />  
            </label>
        </div>

        <button className="btn" type="submit" onClick={handleSignup}>Sign Up</button>

    </div>
  );
}

export default Signup;
