import express,{json} from "express";
import { Resgister } from "./CertRouter/UserRouter.js";

const CertiApp= express();
CertiApp.use(json());
const port= 8000;

CertiApp.use('/',Resgister)

CertiApp.listen(port,(req,res)=>{
    console.log(`Your server is Listening to port ${port}`)
})

