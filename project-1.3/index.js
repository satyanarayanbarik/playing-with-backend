const express = require("express");
const userRouter = require("./routes/user.js")
const {connectMongoDb} = require("./connection.js")
const {logReqRes} = require("./middlewares/index.js")
const {handleGetAllUsers} = require("../controller/user.js")
const app = express();
const PORT = 8000;
/*
READ ABOUT HTTP HEADER,MIDDLEWARE : 
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
https://www.geeksforgeeks.org/understanding-html-form-encoding-url-encoded-and-multipart-forms/
*/

//CONNECTION
connectMongoDb('mongodb://127.0.0.1:27017/backend-app').then(() => {
    console.log("MongoDb connected")
})
/*.then(() => console.log('MongoDB connected'))
.catch((err) => console.log("Mongo Error",err));*/


//SCHEMA

const User = mongoose.model("user",userSchema);

app.use(express.json());// Parses JSON request bodies
app.use(express.urlencoded({ extended: false}));

/*
app.use((req,res,next) => {
    console.log("Hello from middleware 1");
    //return res.json({mgs : "Hello from middleware 1" });
    next(); // will let the route
});
app.use((req,res,next) => {
    console.log("Hello from middleware 1");
    //req.myUsername = "Kalua Don"
    return res.end("Hey");
});
//you have to use next() for routing
*/
app.use(logReqRes("log.txt"))


app.use('/api/user',userRouter)

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})


