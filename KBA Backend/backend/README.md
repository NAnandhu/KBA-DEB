npm init// first to initialize node in our backend
create index.js // this is backend main file
.gitignore //it will remove nodemodules folder when we push on git hub
npm i express // install express 
import express in index.js file- import express from 'express'
then create an instance of express -const app=express()
set a port number for running backend - port-8000
then set listen to the port with using call back function -  app.listen(port,()=>{
    console.log(`Server listening in the port ${port}`);
    
})

