const mongoose = require("mongoose");

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
    gender:{
        type:String,
    },
   },
   { timestamps : true}
);

//middleware plugins
app.use(express.urlencoded({ extended: false}));

app.use((req,res,next) => {
    fs.appendFile(
        "log.txt",
        `\n${Date.now()}:${req.ip}: ${req.method}:${req.path}\n`,
        (err,data) => {
            next();
        }
    );
});

const User = mongoose.model("user",userSchema);
module.exports =  User