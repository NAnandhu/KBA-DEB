import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { authMiddileware } from "../Middileware/auth.js";

dotenv.config();
const secretKey = process.env.SecretKey
const userSchema = new mongoose.Schema({

    name: String,
    username: { type: String, unique: true },
    password: String,
    role: String
})

const User = mongoose.model("userDetails", userSchema)

const bookSchema = new mongoose.Schema({

    bookid: { type: String, unique: true },
    bookname: String,
    author: String,
    description: String

})

const Book = mongoose.model("bookDetails", bookSchema)

mongoose.connect("mongodb://localhost:27017/LibrayApp")

const adminRouters = Router()

adminRouters.post('/signup', async (req, res) => {

    const { Name, UserName, Password, Role } = req.body

    const existingEmail = await User.findOne({ username: UserName })

    try {
        if (existingEmail) {
            res.status(400).json({ message: "Email Already exist" })
        } else {

            const newPass = await bcrypt.hash(Password, 10)

            const newUser = new User({
                name: Name,
                username: UserName,
                password: newPass,
                role: Role
            })

            await newUser.save();

            res.status(200).json({ message: "Register Successfull" })
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error);


    }
})

adminRouters.post("/login", async (req, res) => {

    const { UserName, Password } = req.body

    const result = await User.findOne({ username: UserName })

    try {
        if (!result) {

            res.status(404).json({ message: "Invalid email" })
        } else {

            const isValid = await bcrypt.compare(Password, result.password)

            if (isValid) {

                const token = jwt.sign({ username: result.username, userRole: result.role }, secretKey, { expiresIn: "1h" })
                console.log(token);

                res.cookie("bToken", token, {
                    httpOnly: true
                })

                res.status(200).json({ message: "Login successfull" })
            } else {
                res.status(400).json({ message: "Invalid Password" })
            }

        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error);

    }


})

adminRouters.post("/addBook", authMiddileware, async (req, res) => {

    const { BookId, BookName, Author, Description } = req.body

    const result = await Book.findOne({})
    try {
        if (result) {

            return res.status(400).json({ message: "Book Already exist" })

        }
        if (req.userRole == "admin") {

            const newBook = new Book({
                bookid: BookId,
                bookname: BookName,
                author: Author,
                description: Description
            })
            await newBook.save();

            res.status(200).json({ message: "Book Added" })
        } else {
            res.status(401).json({ message: "Unauthorized user" })
        }


    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }

})


adminRouters.get("/getBook/:id",authMiddileware, async(req,res)=>{

    const bookid =req.params.id

    const result = await Book.findOne({bookid:bookid})
try {
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json({message:"not found the book"})
    } 
} catch (error) {
    res.status(500).json(error)
}

});


adminRouters.get("/getAllBooks",async(req,res)=>{


    const result = await Book.find()
try {
    if(result){
        res.status(200).json(Array.from(result.entries()))

    }else{
        res.status(404).json({message:"There is no Books added found the book"})
    } 
} catch (error) {
    res.status(500).json(error)
}

});

adminRouters.get('/viewUser', authMiddileware, (req, res) => {
    try {
        const user = req.userRole;
        res.json({ user });
    }
    catch {
        res.status(404).json({ message: 'user not authorized' });
    }
})

// adminRouters.delete('/deleteBook/:ctitle',authMiddileware,async(req,res)=>{
//     try{
//     const title=req.params.ctitle;

//     const result = await Book.findOneAndDelete({title:title})


//     if(!result){
//         return   res.status(401).json({message:"Book is not found"})
//     }

//     if(req.userRole == "Admin"){
//        return res.status(200).json({message:"Book Deleted"})
//     }else{
//         res.status(401).json({message:"error Unauthorized User"})
//     }
// }
//    catch(error){
//         res.status(500).json({message:error});
//     }
// })

// adminRouters.post('/logout',authMiddileware, (req, res) => {
//     res.clearCookie("bToken");
//     res.status(200).json({ message: "Logout successful" });
// });

// // adminRouters.get('/viewCourse', async(req,res)=>{

//     const result = 
//     try{


//         if(course.size!=0){


//         res.send(Array.from(course.entries()))
//     }
// else{
//     res.status(404).json({message:'Not Found'});
// }}
//     catch{
//         res.status(404).json({message:"Internal error"})
//     }
// })

export { adminRouters }