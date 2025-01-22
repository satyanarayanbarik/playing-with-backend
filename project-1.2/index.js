const express = require("express");
const users = require('./MOCK_DATA .json');
const fs = require("fs");

const app = express();
const PORT = 8000;

READ ABOUT HTTP HEADER : 
https://www.geeksforgeeks.org/understanding-html-form-encoding-url-encoded-and-multipart-forms/

app.use(express.json());// Parses JSON request bodies
app.use(express.urlencoded({ extended: false}));
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

app.get("/api/users", (req,res) => {
    //return res.json(users);
    res.setHeader("X-myName","Satya narayan"); //Custom Headers
    //ALWAYS ADD X TO CUSTOM HEADERS
    //console.log("I am in get route",req.myUsername);
    return res.json(users);
}); 

app 
.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id  === id);

    return res.json(user);
})
.patch((req,res) => {
    //Edit user with id
    return res.json({status: "Pending"});
})
.delete((req,res) => {
    //delete user with id
    return res.json({status: "Pending"});
});

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




app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})


