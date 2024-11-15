import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
const secretKey=process.env.SecretKey

const authMiddileware = async(req,res,next)=>{

    const cookies = req.headers.cookie;
    const cookie= cookies.split(';')
 

    for( let cooki of cookie){

        const [name,token]= cooki.trim().split('=');
        if(name === "bToken"){
            const verify =  jwt.verify(token,secretKey);
            console.log(verify);
            console.log(verify.username);
            console.log(verify.userRole);
            req.userRole=verify.userRole;
            
        }

    }
    next();

}

export {authMiddileware}