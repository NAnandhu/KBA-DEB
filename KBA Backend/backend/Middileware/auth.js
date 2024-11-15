import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey =process.env.secretKey;

const authenticate=(req,res,next)=>{
   const cookies= req.headers.cookie;

   const cookie=cookies.split(';')

   for(let cooki of cookie){ 

    const [name,token]= cooki.trim().split('=')
    if(name=="authtoken"){
    const verified=  jwt.verify(token,secretKey)
      console.log(verified);
      console.log(verified.Username);

      req.Username=verified.Username
      req.UserRole=verified.Role;
      
      
      break;
    }
   }
   
   console.log(cookies);
   next();
   
}

export{authenticate}