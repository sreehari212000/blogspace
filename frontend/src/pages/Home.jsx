import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchPosts = async()=>{
        try {
            const res = await fetch('http://localhost:8000/api/posts')
            const data = await res.json()
            if(data.status === 'Fail'){
                throw new Error('Oops! Could not fetch posts!')
            }
            setPosts(data.posts)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            
        }
    }
    useEffect(()=>{
        fetchPosts()
    }, [])

  if(loading){
    return (
        <h1 className='text-2xl text-center'>Loading...</h1>
    )
  }
  if(posts.length === 0){
    return (
        <h1 className='text-2xl font-semibold text-center'>No blogs to show!</h1>
    )
  }
  
  return (
    <div className='mx-10 md:mx-20 mt-10 grid lg:grid-cols-2 gap-5 xl:grid-cols-3 2xl:grid-cols-4'>
        {
            posts.map((post)=>(
                <PostCard key={post._id} post={post}/>
            ))
        }
    </div>
  )
}

export default Home