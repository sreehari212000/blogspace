import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

function AddNew() {   
    const titleRef = useRef()
    const quillref = useRef()
    const [image, setImage] = useState("")
    const navigate = useNavigate()

    async function handleClick(e){
        e.preventDefault()
        const plainText = new DOMParser().parseFromString(quillref.current.value, "text/html").body.textContent || "";
        if (plainText.trim() === "") {
            console.log("Content cannot be empty");
            return
        } else {
            // console.log("Submitted Content:", quillref.current.value);
        }

        const formData = new FormData()
        formData.append('title', titleRef.current.value)
        formData.append('content', quillref.current.value)
        formData.append('image', image)

        const token = localStorage.getItem('token')
        if(!token){
            return
        }
        try {
            const res = await fetch('http://localhost:8000/api/posts', {
                headers: {
                    "authorization": `Bearer ${token}`, 
                },
                method: 'POST',
                body: formData
            })
            if(res.status !== 200){
                throw new Error('Creating post failed!')
            }else{
                navigate('/')
            }
            
        } catch (error) {
            
        }
    }

    function handleImage(e){
        setImage(e.target.files[0])
    }
   
    
  return (
    <form className='md:border md:mx-auto mt-20 w-full lg:w-[60%] p-10 text-center flex flex-col gap-10 rounded-lg' onSubmit={handleClick}>
        <h1 className='text-xl text-center'>Create new blog</h1>

        <div>
            <label htmlFor="" className=''>Title</label>
            <input type="text" ref={titleRef}  required placeholder="Type here" className="input input-bordered w-full mt-2" />
        </div>
        <div>
            <label htmlFor="" className='s'>Content</label><br/>
             <ReactQuill theme='snow' className='pt-2 h-36' ref={quillref}/>
        </div>
        <div className='mt-10'>
            <label htmlFor="" className='s'>Add image</label><br/>
            <input type="file"  onChange={handleImage} name='image' className="file-input w-full mt-2" />
        </div>
        <button className='btn mx-auto' type='submit'>Create</button>
    </form>
  )
}

export default AddNew