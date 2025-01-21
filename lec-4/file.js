const fs = require("fs");
const os = require("os");

//Blocking request --> When we use sync..
const result = fs.readFileSync("contact.txt","utf-8");
console.log(result);  

//Non-Blocking
fs.readFile("test.txt","utf-8",(err,result) => {
    console.log(result);
}) ;

//for info about OS
console.log(os.cpus(),length);
 