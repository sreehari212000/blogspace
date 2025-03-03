import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [loggedin, setLoggedin] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)

    const getUser = async()=>{
        const token = localStorage.getItem('token')
        if(!token)return;
        try {
            const response = await fetch('http://localhost:8000/api/users/profile',{
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if(data.status === 'Fail'){
                const error = new Error(data.message)
                throw error
            }
            setUser(data.user)          
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getUser()
    }, [])

    const login = (token, userId)=>{
		localStorage.setItem('token', token)
		localStorage.setItem('userId', userId)
        getUser()
		setLoggedin(true)        
    }

	const logout = () =>{
		localStorage.removeItem('token')
		localStorage.removeItem('userId')
		setLoggedin(false)
	}


    return (
        <AuthContext.Provider value={{loggedin, login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext