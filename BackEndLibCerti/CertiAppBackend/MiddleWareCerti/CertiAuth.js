import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();
const secretKey = "Hai";

const authenticate=(req,res,next)=>{
 const cookies= req.headers.cookie;

 console.log(cookies);
 const cookie=cookies.split(';');
 for(let cooki of cookie){
    const [name,token]=cooki.trim().split('=');
    if(name=='UserToken'){
     const verified =jwt.verify(token,secretKey);
     console.log(verified);
     console.log(verified.UserName);
     console.log(verified.Role)
     req.UserName=verified.UserName
     req.Role= verified.Role
     break;
    }
 }
 next();
}
export{authenticate}