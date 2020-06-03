const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const http = require("https");

const app = express();
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended: true}))


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running on port 3000")

} )

app.get("/", (reg, res)=>{

    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (reg, res)=>{
    const firstName = reg.body.first;
    const lastName = reg.body.last;
    const email = reg.body.email;

    console.log(firstName, lastName, email);


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    }


    const url = "https://us10.api.mailchimp.com/3.0/lists/4215854fac"
    const jsonData = JSON.stringify(data)
    const options = {
        method: "POST",
        auth: "guccibase:0a7444aa601b039643b3e50638d7a364"
    }

    const request = http.request(url, options, (response)=>{

        response.on("data", (data)=>{
            console.log(JSON.parse(data));
            
        })

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")

        }else{
            res.sendFile(__dirname + "/failure.html")

        }


    })

    request.write(jsonData)


    

    request.end()

    

})


app.post("/failure", (reg, res)=>{

    res.redirect("/")

})

//"https://us10.api.mailchimp.com/3.0/lists/4215854fac"

//0a7444aa601b039643b3e50638d7a364-us10

//4215854fac