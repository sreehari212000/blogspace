import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import SingleBlog from './pages/SingleBlog'
import AddNew from './pages/AddNew'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Navbar/>}>
                <Route index element={<Home />}/>
                <Route path='/signin' element={<Signin />}/>
                <Route path='/signup' element={<Signup />}/>
                <Route path='/add-new' element={<ProtectedRoute><AddNew /></ProtectedRoute>}/>
                <Route path='/blog/:blogId' element={<SingleBlog />}/>
            </Route>
        </Routes>
    </div>
  )
}

export default App
