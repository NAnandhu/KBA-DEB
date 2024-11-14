import express from 'express';
import cors from 'cors'
import { LibRouter } from './LibRouter/UserRouterLib.js';

const app = express();
const port = 8000;

// const user = new Map();
app.use(cors({
    origin:'http://127.0.0.1:5501',
    credentials:true

}))

app.get('/', (req, res) => {

    res.send("Hello world");

})
app.use('/',LibRouter)
app.listen(port, () => {  
    
     //call back function for listen the port
    console.log(`Server is Listening to port ${port}`)
})



