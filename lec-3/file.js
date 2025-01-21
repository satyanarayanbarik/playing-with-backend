const fs = require("fs");


//Syncronous call it is
fs.writeFileSync("./test.txt","Hello my little ones");
/*will create a text file named test with 
the content "Hello my little ones" */


//ASyncronous call it is
fs.writeFile("./test.txt","Hello everyNYAN",(err) => {});
/* will create a text file named test with 
the content "Hello everyNYAN" */

//When we use syncronous it will put the result in a variable and return it
const result = fs.readFileSync("./contact.txt","utf-8");
console.log(result);

//When we use it without sync exapmple -> Async
fs.readFile("./contact.txt","utf-8",(err,result) => {
    if(err){
        console.log("error",err);
    }else{
        console.log(result);
    }
})

//for appending the content in a file
//fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());
fs.appendFileSync("./test.txt",`${Date.now()} Hey there`);
//We can use this for minitoring system in a server for giving details of login time

//We can COPY files
fs.cpSync("./test.txt","./copy.txt");

//We can DELETE files
fs.unlinkSync("./copy.txt");