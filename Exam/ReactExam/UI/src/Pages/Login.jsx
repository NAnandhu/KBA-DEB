// 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);

    const newUser = {
      email,
      password
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/login", { // Fixed the URL with the protocol
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message); // Display the error message from the backend
        return;
      }

      // Parse successful response
      const data = await response.json();
      console.log(data);

      // Check for success status
      if (response.status === 200) {
        alert(data.message); // Show success message
        navigate("/Appoinment"); // Navigate to the Appointment page
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className='flex justify-center'>
        <form onSubmit={handleLogin} className='bg-slate-400 text-black p-12 w-96 mt-12'>
          <label htmlFor="email">Email</label>
          <div>
            <input 
              id="email" 
              onChange={(e) => setEmail(e.target.value)} 
              type="text" 
              placeholder='Email' 
              className='w-full'
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div>
            <input 
              id="password" 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" // Changed to 'password' type for security
              placeholder='Password' 
              className='w-full'
              required
            />
          </div>

          <div className='flex justify-around'>
            <p>Don't have an account?</p>
            <Link to="/">Signup</Link>
          </div>
          <div>
            <button type="submit" className='bg-white'>LOGIN</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
