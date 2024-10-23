import express from 'express';
import { LibRouter } from './LibRouter/UserRouterLib.js';

const app = express();
const port = 8000;

const user = new Map();

app.get('/', (req, res) => {

    res.send("Hello world");

})
app.listen(port, () => {  
    
     //call back function for listen the port
    console.log(`Server is Listening to port ${port}`)
})



