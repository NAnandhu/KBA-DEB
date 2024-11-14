import React from 'react'
import NavBar from '../components/NavBar'

const Mainlayout = ({children}) => {
  return (
    <>
    <NavBar/>
    <main>{children}</main>
    </>
  )
}

export default Mainlayout