
import express,{json} from 'express';
import { Exam } from './Routes/ExamRouters.js';
const app= express();
app.use(json());
app.use('/',Exam)
const PORT = 8000

app.listen(PORT,()=>{
    console.log("server running on PORT",PORT);
    
})
