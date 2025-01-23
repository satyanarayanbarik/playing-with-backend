const express = require("express")

const { 
    handleGetAllUsers, 
    handlegetUserById, 
    handleUpdateUserById, 
    handleDeleteUserById,
    handleCreateNewUser
} = require("../controller/user.js")

const router = express.Router();

/*router.get("/api/users", async(req,res) => {
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
}); */
//REST API
router.route("/").get(handlegetUserById).post("/",handleCreateNewUser);

router
.route("/:id")
.get(handlegetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

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
router.post("/",handleCreateNewUser);

module.exports = router;