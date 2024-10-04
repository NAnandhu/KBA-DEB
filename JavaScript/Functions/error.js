try{
    //Code that might throw an error
    let result =riskyOperations();
    console.log(result);
}catch(error){
    //code to handle the error
    console.log('An error occurred:'+error.message);
    
}finally{

    //code that run regardless of an error
    console.log('this will alway run')
}
function riskyOperations(){
    let obj;
    obj.property;//This will throw an error
}