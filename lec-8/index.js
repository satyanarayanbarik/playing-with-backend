const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

//handler function 
const app = express();

app.get("/",(req,res) => {
    return res.send("Hello From HomePage");
});
app.get("/about",(req,res) => {
    //return res.send("Hello From About Page");
    return res.send(`Hello ${req.query.name}`);
});
app.get("/about",(req,res) => {
    return res.send("Hello From About Page"+"hey"+req.query.name + 'you are' + req.query.age);
});


//const myServer = http.createServer((req,res) => {
function myHandler(req,res){
    if(req.url === "./favicon.ico") return res.end();
    const log = `${Date.now()}:${req.method}:${req.url} New Req Recieved\n`;
    const myUrl = url.parse(req.url,true);
    //console.log(myUrl);
    fs.appendFile("log.txt",log,(err,data) =>{
        //res.end("Hello from server again");
        switch(myUrl.pathname){
            case "/": 
                if(req.method == "GET") res.end("Homepage");
                break;
            case "/about": 
                const username = myUrl.query.myname;
                res.end(`Hi,${username}`);
                break;
            case "/search": 
                const search = myUrl.query.search_query;
                res.end("Here are your results for" + search);
                break;
            case "/signup": 
                if(req.method === "GET") res.end("This is a signup form");
                else if(req.method === "POST"){
                    //DB QUERY
                    res.end("Success");
                }
                res.end("Here are your results for" + search);
                break;
            default:
                res.end("404 Not Found");
        }
    });
    //console.log("New request from server");
    res.end("Hello from Server");
};

const myServer = http.createServer(app);

myServer.listen(8000, () => {
    console.log("Server started");
});
