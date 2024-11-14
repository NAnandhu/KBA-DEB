import React from 'react'
import {BrowserRouter as Router,Routes,Route} from'react-router-dom'
import Home from './Pages/Home'
import AddCoures from './Pages/AddCoures'
import Update from './Pages/Update'
import Contact from './Pages/Contact'
import Course from './Pages/Course'
import NotFound from './Pages/NotFound'
import CouresPage from './Pages/CouresPage'
const App = () => {
  return (
   <Router>
    <Routes>
      <Route path='/'element={<Home />}></Route>
      <Route path='/AddCourse'element={<AddCoures />}></Route>
      <Route path='/Update/:id'element={<Update />}></Route>
      <Route path='/Contact'element={<Contact />}></Route>
      <Route path='/Course/:id'element={<Course />}></Route>
      <Route path='/CouresPage/'element={<CouresPage />}></Route>
      <Route path='/*'element={<NotFound />}></Route> 
    </Routes>
   </Router>
  )
}


export default App