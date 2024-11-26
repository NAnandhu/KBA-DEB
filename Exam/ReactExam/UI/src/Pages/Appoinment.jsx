import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Appoinment = () => {
    const[TokenId,setTokenId]=useState('');
    const[Patientname,setPatientname]=useState('');
    const[Doctorname,setDoctorname]=useState('');
    const[Date,setDate]=useState('');
    const[Time,setTime]=useState('');
  
    const navigate=useNavigate();

    const submitform =async (e)=>{
        e.preventdefault();
        const newAppointment={
            TokenId,
            Patientname,
            Doctorname,
            Date,
            Time
        }
    }   
  return (
    <div className='bg-sky-300 w-[400px] h-[600px]'>
        <h1 className='text-2xl text-black font bold'>Add Appoinment</h1>
        <h4>Token Id</h4>
        <input type="text" 
               id="tokenid"

               />
        <h4 className='text-xl text-white'>Patient Name</h4>
        <input type="text" 
             id="pname"/> 
             <h4 className='text-xl text-white'>Doctor Name</h4>      
             <input type="text" 
             id="dname"/>
             <h4  className='text-xl text-white'>Date</h4>
            <input type="text"     
            id="date"/>
            <h4 className='text-xl text-white'>Time</h4> 
            <input type="text" id="time"/>            

    </div>
  )
}

export default Appoinment
