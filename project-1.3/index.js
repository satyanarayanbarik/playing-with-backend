const express = require("express");
const users = require('./MOCK_DATA .json');
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");

const app = express();
const PORT = 8000;
/*
READ ABOUT HTTP HEADER,MIDDLEWARE : 
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
https://www.geeksforgeeks.org/understanding-html-form-encoding-url-encoded-and-multipart-forms/
*/

//CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/backend-app')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log("Mongo Error",err));


//SCHEMA
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    }, 
    jobTitle: {
        type:String,
    },
})

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

app.use((req,res,next) => {
    fs.appendFile(
        "log.txt",
        `\n${Date.now()}:${req.ip}: ${req.method}:${req.path}\n`,
        (err,data) => {
            next();
        }
    );
});

//you have to use next() for routing
*/
app.get("/api/users", async(req,res) => {
    //return res.json(users);
    //res.setHeader("X-myName","Satya narayan"); //Custom Headers
    //ALWAYS ADD X TO CUSTOM HEADERS
    //console.log("I am in get route",req.myUsername);
    const allDbUsers = await User.find({});
    const html = `
        <ul>
            ${allDbUsers.map((user) => `<li>${user.firstName}- ${user.email}</li>`).join("")}
        </ul>
    `;
    res.send(html);
}); 
//REST API
app.get("/api/users/:id",async(req,res) => {
    const allDbUsers = await User.findById(req.params.id);
    //if(!user) return res.status(404).json({error: "user not found"});

    return res.json(allDbUsers);
})

app 
.route("/api/users/:id")
.get(async(req,res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found"});

    return res.json(user);
})
.patch(async(req,res) => {
    //Edit user with id
    await User.findByIdAndUpdate(req.params.id,{lastName : 'Changed'});
    return res.json({status: "Sucess"});
})
.delete(async(req,res) => {
    //delete user with id
    await User.findByIdAndUpdate(req.params.id);
    return res.json({status: "Success"});
});

/*
app.post("/api/users", (req, res) => {
    // Accept data from both req.body and req.query
    const { first_name, last_name, email, gender, job } = req.body.first_name ? req.body : req.query;

    if (!first_name || !last_name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser = {
        id: users.length + 1,
        first_name,
        last_name,
        email,
        gender,
        job
    };

    users.push(newUser);

    console.log("New User Added:", newUser);

    return res.status(201).json({ message: "User created successfully", user: newUser });
});
*/

//-------SIR--------------------------------
/*
app.post("/api/users", async(req, res) => {
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender||
        !body.jobTitle
    ){
        return res.status(400).json({ msg: "All fields are req..." });
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title,
    });

    console.log("result,result");

    return res.status(201).json({msg : "success"});
})
*/
app.post("/api/users", async (req, res) => {
    const body = req.body;

    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    },
    {timestamps : true}
);

    console.log(result);

    return res.status(201).json({ msg: "Success", user: result });
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})


