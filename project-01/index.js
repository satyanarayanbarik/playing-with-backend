
const express = require("express");
const users = require('./MOCK_DATA .json');

const app = express();
const PORT = 8000;

//middleware-->plugin : whenever url encoded data will come from it will add up in the body
app.use(express.json());// Parses JSON request bodies
app.use(express.urlencoded({ extended: false}));

//REST API
/*
app.get("/api/users", (req,res) => {
    return res.json(users);
});
*/



app.get("/api/users", (req,res) => {
    //return res.json(users);
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")};
    </ul>
    `
    res.send(html)
}); 
/*
//REST Api
app.get('/api/users', (req, res)=>{
    return res.json(users);
})
    */

//:id -> for dynamic
/*app.get("/api/users/:id", (req,res) => { 
    //since id is a string convert ity to number
    const id = Number(req.params.id);
    const user = users.find((user) => user.id  === id);
    return res.json(users);
}); */

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
/* --------------DIDNT WORKED-----------------
app.post("/api/users", (req,res) => {
    //TODO: Create new user
    const body = req.body;
    console.log("Body",body)
    return res.json({status:"pending"});
});
USING ALTERNATE BELOW BY GPT :_ (
*/
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


