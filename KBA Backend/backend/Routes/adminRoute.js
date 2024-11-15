import { Router } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const secretKey =process.env.secretKey;
const adminRouter=Router()
// const user= new Map()
//user schema

const userSchema = new mongoose.Schema({

  FirstName:String,
  LastName:String,
  Username:
  {type:String,
    unique:true
  },
  Password:String,
  Role:String
})

//create model
const User= mongoose.model("userDetails",userSchema)


mongoose.connect('mongodb://localhost:27017/KBA_Course1')


adminRouter.get('/',(req,res)=>{
    res.send("hello world");
})


adminRouter.post('/signup',async(req,res)=>{
    try {
      // console.log("users data added"); 
           const {
                FirstName,
                LastName,
                Username,
                Password,
                Role
              } = req.body
    
          const newP= await  bcrypt.hash(Password,10)
          
          const existingUser= await User.findOne({Username:Username})
    
              if(existingUser){
                res.status(400).json({message:"username Already exist"})
              }else{
               const newUser=  User({
                FirstName:FirstName,
                LastName:LastName,
                Username:Username,
                Password:newP,
                Role:Role
               });
                await newUser.save();
                // console.log(user.get(Username));
                
                res.status(201).json({message:"register successfull"})
              }
    } catch (error) {
      res.status(500).json(error)
    }                   
    })

    adminRouter.post('/login',async(req,res)=>{
        const {Username,Password}=req.body
         console.log(Username);
         const result= await User.findOne({Username:Username})

        if(!result){
            res.status(400).json({message:"inavlid username"})
        }else{
           const isValid=  await bcrypt.compare(Password,result.Password)
            console.log(isValid);

            if(isValid) {
                const token = jwt.sign({Username:Username,Role:result.Role},secretKey,{expiresIn:'1h'})
                res.cookie("authtoken",token,{
                    httpOnly:true
                });
                console.log(token);
                return res.status(200).json({ message: "Login successful" });
                
            }else{
              return res.status(401).json({ message: "invalid password" });

            }

                  
        }
        
    })
    
    adminRouter.post('/logout', (req, res) => {
      res.clearCookie("authtoken");
      res.status(200).json({ message: "Logout successful" });
  });

    

export {adminRouter};