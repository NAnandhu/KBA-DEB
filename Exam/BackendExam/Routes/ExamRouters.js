import express, { Router } from 'express'
import mongoose, { Schema } from 'mongoose';

const Exam =Router();
const Patients =new Schema({
    TokenId:{type:String,unique:true},
    PatientName:String,
    DoctorName:String,
    Date:String,
    Time:String
}) 
const Patient =mongoose.model('patientDetails',Patients)

mongoose.connect('mongodb://localhost:27017/HospitalDb')

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
Exam.put('/update',async(req,res)=>{
    const data=req.body
    const{tokenid,newPname,newDname,newDate,newTime}=data

    const result = await Patient.findOne({TokenId:tokenid})
    if(result){
        result.PatientName=newPname || result.PatientName
        result.DoctorName=newDname || result.DoctorName
        result.Date=newDate || result.Date
        result.Time=newTime || result.Time
        await result.save();
        res.status(200).json({message:"Details Update Successfully"})
    }
    
    else{
        res.status(400).json({message:"Details NotFound"})

    }

})

Exam.delete('/detele/:id',async(req,res)=>{

    const Id=req.params.id

    const result= await Patient.findOneAndDelete({TokenId:Id})

    if(result){
      res.status(200).json({message:"Details Deteled Successfully"})

    }else{
        res.status(400).json({message:"Details NotFound"})

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

Exam.get('/searchs/:name',async(req,res)=>{

    const name=req.params.name

    const result= await Patient.find({DoctorName:name})

    if(result){
     res.status(200).json({message:"Success",result})
     
    }else{
        res.status(400).json({message:"Details NotFound"})
    }
})



export {Exam}