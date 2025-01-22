const express = require("express");
const users = require('./MOCK_DATA .json');

const app = express();
const PORT = 8000;

//Routes
app.get("/api/users", (req,res) => {
    return res.json(users);
});

app.get("/api/users", (req,res) => {
    //return res.json(users);
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")};
    </ul>
    `;
});

//:id -> for dynamic
app.get("/api/users/:id", (req,res) => { 
    //since id is a string convert ity to number
    const id = Number(req.params.id);
    const user = users.find((user) => user.id  === id);
    return res.json(users);
});

/*
app.post("/api/users", (req,res) => {
    //TO Create new user
    return res.json({status:"pending"});
});

app.delete("/api/users", (req,res) => {
    //TO Delete the user with id
    return res.json({status:"pending"});
});

app.patch("/api/users/:id", (req,res) => {
    //TO EDIT USER WITH ID
    return res.json({status:"pending"});
});
*/ //WE can merge all three of this

app
.route('/api/users/:id').get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id  === id);
    return res.json(users);
}).patch((req,res) => {
    //Edit user with id
    res.json({status: "Pending"});
}).delete((req,res) => {
    //delete user with id
    return res.join({status: "Pending"});
});

const myServer = http.createServer(app);

myServer.listen(8000, () => {
    console.log("Server started");
});


