// server.js
// where your node app starts

// init project
const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html

app.get("/:dateVal", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
  var dateVal = request.params.dateVal;
  
  
var  dateFormattingOptions = {
  year:'numeric',
  month:'long',
  day:'numeric'
}

if (isNaN(dateVal)){
   var naturalDate = new Date(dateVal);
   naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
   var unixDate = new Date(dateVal).getTime()/1000;
}
else{
   var unixDate = dateVal;
   var naturalDate = new Date(dateVal * 1000);
   naturalDate =  naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
}
  
  response.json({unix: unixDate, natural: naturalDate})
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

