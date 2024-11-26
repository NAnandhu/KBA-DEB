import express, { Router } from 'express'
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secretKey ="hai"

const Exam =Router();
const Patients =new Schema({
    TokenId:{type:String,unique:true},
    PatientName:String,
    DoctorName:String,
    Date:String,
    Time:String
}) 
const User =new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    role:String

})
const Patient =mongoose.model('patientDetails',Patients)

const Users =mongoose.model('UserDetails',User)


mongoose.connect('mongodb://localhost:27017/HospitalDb')

Exam.post('/signup',async(req,res)=>{
    const data=req.body
    const {Name,Email,Password,Role}=data

    const result= await Users.findOne({email:Email})
    
    const newPass =await bcrypt.hash(Password,10) 

    console.log(newPass)

    if(result){
        res.status(400).json({message:"Already exisit"})
    }else{
        const newUser =new Users({
            name:Name,
            email:Email,
            password:newPass,
            role:Role
        })
        await newUser.save()
        res.status(200).json({message:"Signup Success"})
    }

})
Exam.post('/login', async (req, res) => {
    const data = req.body;
    const { email, Password } = data;

    // Find the user by email
    const result = await Users.findOne({ email: email });

    if (result) {
        const isValid = await bcrypt.compare(Password,result.password);

        if (isValid) {
            const token = jwt.sign({ Username: result.name, Role: result.role },secretKey,{ expiresIn: '1h' });

            res.cookie("authtoken", token, {
                httpOnly: true
            });

            console.log(token);
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } else {
        return res.status(400).json({ message: "Invalid username" });
    }
});

Exam.post('/add',async(req,res)=>{
    const data= req.body
    const {tokenid,patientname,doctorname,date,time}=data
 
    const result= await Patient.findOne({TokenId:tokenid})

    if(result){
        res.status(400).json({message:"Already added"})
    }else{
        const NewPatient =new Patient({
            TokenId:tokenid,
            PatientName:patientname,
            DoctorName:doctorname,
            Date:date,
            Time:time
        })
        await NewPatient.save()
        res.status(200).json({message:"Successsfully added details"})
    }

})

Exam.get('/search/:id',async(req,res)=>{

    const Id=req.params.id

    const result= await Patient.find({TokenId:Id})

    if(result){
     res.status(200).json({message:"Success",result})
     
    }else{
        res.status(400).json({message:"Details NotFound"})
    }
})
// Exam.get('/searchs/:name',async(req,res)=>{

//     const name=req.params.name

//     const result= await Patient.find({DoctorName:name})

//     if(result){
//      res.status(200).json({message:"Success",result})
     
//     }else{
//         res.status(400).json({message:"Details NotFound"})
//     }
// })

export {Exam}