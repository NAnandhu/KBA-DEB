import React from "react"
// import NavBar from "../components/NavBar"
import Mainlayout from "../Layout/Mainlayout"
import Hero from "../components/Hero"
import TopCourses from '../components/TopCourses'
import ViewAllCourses from '../components/ViewAllCourses'
import CourseGrid from '../components/CourseGrid'
import CourseData from '../data/courses.json'
const Home = () => {
  const topCourses =CourseData.slice(0,3);
  return (
    <div>
      <Mainlayout>
        <Hero />
        <TopCourses />
        <CourseGrid courses={topCourses} />
        <ViewAllCourses />
      </Mainlayout>


    </div>

  )
}
export default Home