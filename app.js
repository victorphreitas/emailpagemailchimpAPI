//require express js
const express = require("express")

//require body-parser to get data from the html page
const bodyParser = require("body-parser")

//requiring mail chimp 
const client = require("@mailchimp/mailchimp_marketing");

//https request
const https = require('https');

//store port 3000 on a variable 
const port = 3000

//set app function
const app = express()

//mail chimp 
client.setConfig({
  apiKey: "4885e419d5c905804f45921a1dba9856-us1",
  server: "us1",
}); 

//body parser urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//in order to connect css file to the html page in different places
app.use(express.static(__dirname + "/public")) 

//listen to the port 
app.listen(process.env.PORT || port, function(){
  console.log(`Server has been started successfully.`)
})

//get method to make the html page run on the server
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
  const userFirstName = req.body.firstName
  const userLastName = req.body.lastName
  const userEmail = req.body.email


client.setConfig({
  apiKey: "4885e419d5c905804f45921a1dba9856-us1",
  server: "us1",
});

const run = async () => {
  const response = await client.lists.batchListMembers("939f75443f", {
    members: [{
      email_address: userEmail,
      status: "subscribed",
      merge_fields: {
        FNAME: userFirstName,
        LNAME: userLastName
        },
    }],
  });
  
  if (res.statusCode === 200 && userFirstName !== "" && userLastName !== "" && userEmail !== ""){
    res.sendFile(__dirname + "/success.html")
  } else {
    res.sendFile(__dirname + "/failure.html")
  }
  
  // console.log(response);
};

run();

}) 

app.get('/failure', (req, res) => {
  res.redirect('/');
});  


//url structure
//https://<dc>.api.mailchimp.com/3.0/lists/{list_id}/members/{subscriber_hash}/notes/{id}
//mail chimp url 
//https://dc.api.mailchimp.com/3.0/lists/{list_id}/members/
//mail chimp api key 
//let apiKey = 4885e419d5c905804f45921a1dba9856-us1
// let dc = us1

//list id
//let listId = 939f75443f

//mail chimp client key (for mobible)
//983a482eb39da326b29b7870c8fd9c09-us1