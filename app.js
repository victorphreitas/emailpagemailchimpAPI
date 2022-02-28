//require express js
const express = require("express")

//require body-parser to get data from the html page
const bodyParser = require("body-parser")

//requiring mail chimp 
const mailchimp = require("@mailchimp/mailchimp_marketing");

//https request
const https = require('https');

//store port 3000 on a variable 
const port = 3000

//set app function
const app = express()

//mail chimp 
mailchimp.setConfig({
  apiKey: "4885e419d5c905804f45921a1dba9856-us1",
  server: "us1",
});

//body parser urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//in order to connect css file to the html page in different places
app.use(express.static("public"))

//listen to the port 
app.listen(process.env.PORT || port, function(){
  console.log(`Server is running...`)
})

//get method to make the html page run on the server
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
  const userFirstName = req.body.firstName
  const userLastName = req.body.lastName
  const userEmail = req.body.email
  // req.body.name, req.body.email = ""  

  //mail chimp code goes here 
  const listId = "939f75443f";
  const subscribingUser = {
  firstName: userFirstName,
  lastName: userLastName,
  email: userEmail
};

async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  });

  console.log(
    `Successfully added contact as an audience member. The contact's id is ${
      JSON.stringify(response)
    }.` 
  );
}

run();


  
  //I can store this data in mail chimp and send automatic emails to my clients 
  // console.log(userFirstName)
  // console.log(userLastName)
  // console.log(userEmail)


  if (res.statusCode === 200 && userFirstName !== "" && userLastName !== "" && userEmail !== ""){
    res.sendFile(__dirname + "/success.html")
  } else {
    res.sendFile(__dirname + "/failure.html")
  }

}) 

app.get('/failure', (req, res) => {
  res.redirect('/');
});  


//mail chimp api key 
//4885e419d5c905804f45921a1dba9856-us1

//list id
//939f75443f

//mail chimp client key (for mobible)
//983a482eb39da326b29b7870c8fd9c09-us1