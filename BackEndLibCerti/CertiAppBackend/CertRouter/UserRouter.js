import { Router, json } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { authenticate } from "../MiddleWareCerti/CertiAuth.js";
const Resgister = Router();

const DataCourses = new Map();
Resgister.use(json())
const secretKey = "Hai";

//issue Certificate

Resgister.post('/addCertificate',authenticate,(req, res) => {
    try {
        const { Courses, CertificateId, CertificateName, Grade, IssueDate } = req.body
        // if(req.Rolee=="admin"){
            // console.log('hai')
            if (DataCourses.has(CertificateId)) {
                res.status(400).json({ message: "Certificate Is Already exist" })
            } else {
                DataCourses.set(CertificateId, { Courses,CertificateName,Grade,IssueDate })
                res.status(200).json({ message: "Certificate Add Successfully" })
                console.log(DataCourses.get(CertificateId));
                console.log('hello')
            }

        // }else{
        //     res.status(400).json({message:"User not Admin"})
        //     console.log("User not Admin")
        // }
        

    } catch (error) {
        res.status(500).json(error);
        console.log(error);

    }
})

// Certi Appsignup 

Resgister.post('/signup', async(req, res) => {
    const { FirstName, LastName, UserName, Password, Role } = req.body
    console.log(Password);
    const newPass = await bcrypt.hash(Password,10);
        console.log(newPass)

    if (DataCourses.has(UserName)) {
        res.status(400).json({ message: "UserName Is Already Exisit" })
    }
    else {
        DataCourses.set(UserName,{ FirstName, LastName, Password:newPass,Role })
        res.status(200).json({ message: "User Resgister Successfully" });
        console.log(DataCourses)
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
            const token = jwt.sign({ UserName: UserName, Role: result.role }, secretKey, { expiresIn: '1h' })
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


//search 

Resgister.get('/search/:name',(req,res)=>{
    const search=req.params.name

console.log(DataCourses.has(search));

    

})









export { Resgister };



