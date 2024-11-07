import express, { Router,json } from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const LibRouter = Router();

const LibDetails = new Map();

 const secretkey='hai'

LibRouter.use(json());

LibRouter.post('/signup', async(req, res) => {
    console.log("Hello");
    const { FirstName, LastName, UserName, Password, Role } = req.body
    console.log(Password);
    const newPass = await bcrypt.hash(Password,10);
    console.log(newPass)

    if (LibDetails.has(UserName)) {
        res.status(400).json({ message: "UserName Is Already Exisit" })
    }
    else {
        LibDetails.set(UserName,{ FirstName, LastName, Password,Role })
        res.status(200).json({ message: "User Resgister Successfully" });
        console.log(LibDetails)
    }

});
LibRouter.post('/login',(req,res)=>{
    const data=req.body
    const{UserName,Password}=data

    const result=LibDetails.get(UserName)

    if(result){
        const isvalid=bcrypt.compare(Password,result.Password)
        console.log(isvalid)
        if(isvalid){
            const token = jwt.sign({UserName:UserName,Role:result.Role},secretkey, { expiresIn: "1h" })
            console.log(token)
            res.cookie('LibToken', token, {
                httpOnly: true
            });res.status(200).json({message:"Login Sucessfully"})


        }else{
            res.status(400).json({message:"Password is incorect"})
        }

    }else{
        res.status(400).json({message:"User is not Exisit"})
    }


    // if(LibDetails.has(UserName)){

    // }


})
LibRouter.post('/addbook',(req,res)=>{
    const data=req.body
    const{BookName,Author,Description,BookId}=data

    if(LibDetails.has(BookId)){
        res.status(400).json({message:"Book is already Added"})

    }else{
        LibDetails.set(BookId,{BookName,Author,Description})
        res.status(200).json({message:"Book is Added successfuly"})
        console.log(LibDetails.get(BookId));
    }
    
})
LibRouter.patch('/update',(req,req)=>{
    const data=req.body
    const{BookId,newBookName,newAuthor,newDescription,}=data
    const item=LibDetails.get(BookId)
    console.log(item)

    item.BookName=newBookName || item.BookName
})

export{LibRouter }