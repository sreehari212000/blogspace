import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineComment } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { ImLink } from "react-icons/im";




const PostCard = ({post}) => {
    const {title, imageUrl, author:{email}} = post
  return (
      <div className='w-fit px-5 py-3 rounded-md bg-gray-900 hover:shadow-gray-600 hover:shadow-md'>
        <Link to={'/blog/:blogId'}>
            <h1 className='text-xl mb-10'>{title}</h1>
            <img src={`http://localhost:8000/${imageUrl}`} alt="" className='w-96 h-48  object-fill rounded-md'/>
        </Link>
        <div className='mt-5 flex items-center justify-between px-2'>
            <p className='hover:text-white'>@{email}</p>
            <div className='flex gap-7'>
                <div className='tooltip' data-tip='In progress'>
                    <MdOutlineComment size={18}/>
                </div>
                <IoBookmarkOutline />
                <ImLink />
            </div>
        </div>
    </div>
  )
}

export default PostCard