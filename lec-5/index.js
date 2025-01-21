const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req,res) => {
    const log = `${Date.now()}:${req.url} New Req Recieved\n`;
    fs.appendFile("log.txt",log,(err,data) =>{
        //res.end("Hello from server again");
        switch(req.url){
            case "/": 
                res.end("Homepage");
                break;
            case "/about": 
                res.end("about");
                break;
            default:
                res.end("404 Not Found");
        }
    });
    //console.log("New request from server");
    res.end("Hello from Server");
});

myServer.listen(8000, () => {
    console.log("Server started");
});
