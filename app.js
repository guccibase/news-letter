const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended: true}))



app.get("/", (reg, res)=>{
    console.log("Server is running on port 3000")

    res.sendFile(__dirname + "/signup.html")
}).listen(3000)


app.post("/", (reg, res)=>{
    var firstName = reg.body.first;
    var lastName = reg.body.last;
    var email = reg.body.email;

    console.log(firstName, lastName, email);
    

})