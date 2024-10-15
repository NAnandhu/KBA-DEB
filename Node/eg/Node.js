const readline =require('readline');
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
const inventory =new Map();

function askCommand(){
    console.log('Welcome');
    console.log('Enter The option add, remove,')
    rl.question("Enter The Option",function(command){
        switch(command){
            case'add':
            addItemPromit()
            break ;      
        }

    })
    function addItemPromit(){
        if(inventory.has(id)){
            console.log(`Enter Id ${id} is already exsist`)
        }else{
            console.log('Enter Id ')
        }
    }
}