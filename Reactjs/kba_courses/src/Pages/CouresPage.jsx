import React from 'react'
import Mainlayout from '../Layout/Mainlayout'
import CourseGrid from '../components/CourseGrid'
import CourseData from '../data/courses.json'

const CouresPage = () => {
  return (
   <Mainlayout>
    <h1 className='text-center text-2xl font-bold mt-10'>AllCoures</h1>
    <CourseGrid courses={CourseData}/>
   </Mainlayout>
  )
}

export default CouresPage