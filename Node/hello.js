const loadash= require('lodash')

console.log('Hello World');

 const newName = "Node.js";

 console.log("Hello",`${newName}`);

 if(newName=='Node.js'){
    console.log("running on nodejs environment")

 }
 for(let i=1;i<=5;i++){
    console.log(i);
 }
 let array =[1,2,3,4,5,];
 console.log(loadash.reverse(array))