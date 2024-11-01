import { Router, json } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { authenticate } from "../MiddleWareCerti/CertiAuth.js";
import mongoose, { Schema } from "mongoose";
const Resgister = Router();

const userschema =new mongoose.Schema({
    firstname:String,
    lastname:String,
    username:{type:String,unique:true},
    password:String,
    role:String
});


const User= mongoose.model('UserDetaisCerti',userschema);



// const DataCourses = new Map();
Resgister.use(json())
const secretKey = "Hai";

// Certi Appsignup 

Resgister.post('/signup', async(req, res) => {
    const { FirstName, LastName, UserName, Password, Role } = req.body
    console.log(Password);
    const newPass = await bcrypt.hash(Password,10);
        console.log(newPass)

    const exstingUser = await User.findOne({ userName: UserName })


    if (exstingUser) {
        res.status(400).json({ message: "UserName Is Already Exisit" })
    }
    else {
        const newUser =new User({
            firstname:FirstName,
            lastname:LastName,
            username:UserName,
            password:Password,
            role:Role

        })
        await newUser.save();
        res.status(201).json({ message: "User Register Successfully" });
        // DataCourses.set(UserName,{ FirstName, LastName, Password:newPass,Role })
        // res.status(200).json({ message: "User Resgister Successfully" });
        // console.log(DataCourses)
    }

});


// Certi Login

Resgister.post('/login',async (req, res) => {
    const data = req.body
    const { UserName,Password } = data;
    // console.log(UserName,Password)
    const result = DataCourses.get(UserName);
    console.log(result.Password);
    if (result) {
        console.log(Password,result.Password);
        const value = await bcrypt.compare(Password,result.Password)
        console.log(value)
        if (value) {
            const token = jwt.sign({ UserName: UserName, Role: result.Role }, secretKey, { expiresIn: '1h' })
            res.cookie('UserToken', token, {
                httpOnly: true

            });
            res.status(200).json({ message: "Login succesfully" })
        } else {
            res.status(404).json({ message: "Password is incorrect" })
        }
    }else{
        res.status(404).json({message:"user id not exist!"})
    }
    
});

//issue Certificate


Resgister.post('/issue',authenticate,(req,res)=>{
    try{
        const data=req.body
        const {CourseID,CourseName,CourseType,Grade,IssueDate}=data
        console.log(CourseID,CourseName,CourseType,Grade,IssueDate)
        if(req.Role == "admin"){
            if(DataCourses.has(CourseID)){
                res.status(400).json({message:"certificate alredy exists"})

            }else{
               DataCourses.set(CourseID,{CourseName,CourseType,Grade,IssueDate})
                res.status(201).json({message:"Certificate addedd successfully"})
                console.log(DataCourses)
                
            }
           
        }else{
            res.status(400).json({message:"unauthorised access"})
        }

    }catch(error){
        res.status(500).json(error);

    }
})


//search 

// Resgister.get('/search/:name',(req,res)=>{
//     const search=req.params.name

// console.log(DataCourses.has(search));

    

// })


export { Resgister };



