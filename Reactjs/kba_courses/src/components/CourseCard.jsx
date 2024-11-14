import React, { useState } from 'react'
import rp from '../assets/images/rp.png'
import { Link } from 'react-router-dom';
const CourseCard = ({course}) => {
  const [likes,setLikes]=useState(0);
  const [showFullDescripition,setShowFullDescripition]=useState(false);
  const getDescripition=() =>{
    const maxLength=100;
    if(showFullDescripition || course.description.length<=maxLength){
      return course.description;

    }else{
      return course.description.substring(0,maxLength)+'...';
    }

  }
  return (
<div className=' bg-purple-100  rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10'>
    <h2 className=' font-bold text-lg text-purple-900 '>{course.title}</h2>
    <img src={rp} alt="course thumbnail" className='w-80 h-40 ' />

    <p className='text-black group-hover:text-white my-2 mx-5'>{getDescripition()} </p>
    {course.description.length>100 &&(
      <button className='text-blue-500 hover:underline mt-2'onClick={()=>setShowFullDescripition(!showFullDescripition)

      }>{showFullDescripition?'show less':'show more'}

      </button>
    )}
    <div className='flex space-x-2 mt-4'>
      <button className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'
      onClick={()=>setLikes(likes+1)}>
        Like:{likes}
      </button>

    </div>
    <Link to={`/course/${course.courseId}`} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 self-start mx-5">Learn More</Link>
</div>


)
}

export default CourseCard