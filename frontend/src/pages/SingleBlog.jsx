import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"

function SingleBlog() {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const {blogId} = useParams()
    console.log(blogId);
    useEffect(()=>{
        const fetchFromAPI = async () =>{
            try {
                const res = await fetch(`http://localhost:8000/api/posts/${blogId}`)
                const data = await res.json()
                setPost(data.post)
            } catch (error) {
                
            }
        }
        fetchFromAPI()
    }, [])


    console.log(post);
    
  return (
    <div className=' m-20'>
        <h1 className='text-2xl'>{post.title}</h1>
        <img src={`http://localhost:8000/${post.imageUrl}`} alt="" className='w-96'/>
        <div dangerouslySetInnerHTML={{__html: post.content}} className='pt-5 px-10'>

        </div>
    </div>
  )
}

export default SingleBlog