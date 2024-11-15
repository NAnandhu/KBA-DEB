import express ,{json}from 'express';
import { adminRouter } from './Routes/adminRoute.js';
import { addCourse } from './Routes/addCourseRoute.js';
import cors from 'cors';
import cookieParser  from 'cookie-parser';

const app= express();

const port=process.env.PORT
app.use(cors({
 origin: 'http://127.0.0.1:5500',
    credentials: true,
}))
app.use(json())
app.use(cookieParser())
app.use('/',adminRouter)
app.use('/',addCourse)

app.listen(port,()=>{
    console.log(`Server listening in the port ${port}`);
    
})


