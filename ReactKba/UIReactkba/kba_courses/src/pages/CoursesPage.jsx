import React from 'react'
import MainLayout from '../layouts/MainLayout'
import CourseGrid from '../components/CourseGrid'
// import CourseData from '../data/courses.json'

const CoursesPage = () => {
  return (
    <MainLayout>

        <CourseGrid isHome={false} />

    </MainLayout>
  )
}

export default CoursesPage