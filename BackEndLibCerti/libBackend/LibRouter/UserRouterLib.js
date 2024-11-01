import express, { Router,json } from 'express'
import bcrypt from 'bcrypt';



const LibRouter = Router();

const LibDetails = new Map();

LibRouter.use(json());

LibRouter.post('/signup', (req, res) => {
    console.log("Hello");
    res.send(200).json("Hello")
    // const { FirstName, LastName, UserName, Password, Role } = req.body
    // console.log(Password);
    // const newPass = await bcrypt.hash(Password,10);
    //     console.log(newPass)

    // if (LibDetails.has(UserName)) {
    //     res.status(400).json({ message: "UserName Is Already Exisit" })
    // }
    // else {
    //     LibDetails.set(UserName,{ FirstName, LastName, Password,Role })
    //     res.status(200).json({ message: "User Resgister Successfully" });
    //     console.log(LibDetails)
    // }

});

export{LibRouter }