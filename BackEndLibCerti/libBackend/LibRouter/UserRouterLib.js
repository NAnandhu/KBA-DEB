import express, { Router, json } from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

const LibRouter = Router();

// const LibDetails = new Map();

const secretkey = 'hai'
const UserSchem = new mongoose.Schema({

    name: String,
    unsername: { type: String, unique: true },
    password: String,
    role: String

})

const User = mongoose.model('UserDetails', UserSchem)

mongoose.connect("mongodb://localhost:27017/LibraySystem")


LibRouter.use(json());

LibRouter.post('/signup', async (req, res) => {
    console.log("Hello");
    const { Name, UserName, Password, Role } = req.body
    console.log(Password);
    const existingUser = await User.findOne({ username: UserName })
    try {

        if (existingUser) {
            res.status(400).json({ message: "UserName Is Already Exisit" })
        }
        else {
            const newPass = await bcrypt.hash(Password, 10);

            const newUser = new User({
                name: Name,
                username: UserName,
                password: newPass,
                role: Role
            })
            await newUser.save();
            res.status(200).json({message:"Register Successfull"})

        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" })

    }



});
LibRouter.post('/login',async(req, res) => {
    const data = req.body
    const { UserName, Password } = data

    const result = await User.findOne({username:UserName})

    if (result) {
        const isvalid = bcrypt.compare(Password,result.password)
        console.log(isvalid)
        if (isvalid) {
            const token = jwt.sign({ UserName: UserName, Role:result.role }, secretkey, { expiresIn: "1h" })
            console.log(token)
            res.cookie('LibToken', token, {
                httpOnly: true
            }); res.status(200).json({ message: "Login Sucessfully" })


        } else {
            res.status(400).json({ message: "Password is incorect" })
        }

    } else {
        res.status(400).json({ message: "User is not Exisit" })
    }


    // if(LibDetails.has(UserName)){

    // }


})
// LibRouter.post('/addbook', (req, res) => {
//     const data = req.body
//     const { BookName, Author, Description, BookId } = data

//     if (LibDetails.has(BookId)) {
//         res.status(400).json({ message: "Book is already Added" })

//     } else {
//         LibDetails.set(BookId, { BookName, Author, Description })
//         res.status(200).json({ message: "Book is Added successfuly" })
//         console.log(LibDetails.get(BookId));
//     }

// })
// LibRouter.patch('/update',(req,req)=>{
//     const data=req.body
//     const{BookId,newBookName,newAuthor,newDescription,}=data
//     const item=LibDetails.get(BookId)
//     console.log(item)

//     item.BookName=newBookName || item.BookName
// })

export { LibRouter }