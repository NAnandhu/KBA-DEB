import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import MainLayout from './Layout/MainLayout';  // Assuming you have a MainLayout component
import SignupPage from './Pages/signup';
import Login from './Pages/Login';
import Appoinment from './Pages/Appoinment';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/appointment" element={<Appoinment />} />
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  );
};

export default App;
