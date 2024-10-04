function checkAge(age){
    if(age<18){
         throw new Error('you must be 18 year or older')
    }else{
      console.log('You are allowed')
    }
}
try{
    checkAge(16);

}catch(error){
 console.log('Error is:'+error.message);
}finally{
   console.log('This alway executed');

}