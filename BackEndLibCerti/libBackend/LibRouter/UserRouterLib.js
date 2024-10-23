import express, { Router,json } from 'express'
import bcrypt from 'bcrypt';



const LibRouter = Router();

const LibDetails = new Map();

LibRouter.use(json());

LibRouter.post('/signup',(req, res) => {
    const { FirstName, LastName, UserName, Password, Role } = req.body
    console.log(Password);

    if (LibDetails.has(UserName)) {
       console.log("UserName Is Already Exisit" )
    }
    else {
        LibDetails.set(UserName,{ FirstName, LastName, Password,Role })
        console.log("UserName Is Register Successfully" )
        console.log(LibDetails)
    }
})
export{LibRouter }