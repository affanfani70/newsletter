//api key = 0378e6db55282aa4a679274866ae2c10-us10
// id = 8cd46ab06c

const express = require('express');
const app = express();
const bodyPraser = require('body-parser');
const https = require("https");

app.use(express.static("public"))
app.use(bodyPraser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})
app.post('/',(req,res)=>{
    const fristName = req.body.fristName;
    const lastName = req.body.lastName;
    const mail = req.body.mail;

    const data ={
        members:[
            {
                email_address: mail,
                status: "subscribed",
                merge_fields:{
                    FNAME: fristName,
                    LNAME: lastName
                }

            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/8cd46ab06c";
    const option = {
        method:"POST",
        auth: "fani:0378e6db55282aa4a679274866ae2c10-us10"
    }
    const request = https.request(url,option,(response)=>{
        if (response.statusCode === 200) {
            res.sendFile(__dirname+'/success.html');
        }else{
            res.sendFile(__dirname+'/failiure.html');
        }
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})
app.post('/failiure',(req,res)=>{
    res.redirect('/');
})



app.listen(3000, () => {
    console.log('Server is running at 3000....');
})
