// Require Express to run server and routes
const express = require("express");
// Cors for cross origin allowance //
const cors = require("cors"); //
/* Dependencies*/ const bodyParser = require("body-parser");

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express(); //

/* Middleware*/ //Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// listener port
const port = 5000;

const server = app.listen(port, listeningToCheck);

function listeningToCheck() {
  console.log(`Server Running On: http://localhost:${port}`);
}

// Require Express to run server and routes
// Get All Data
app.get("/all", sendDataToApp);

function sendDataToApp(req, res) {
  res.send(projectData);
}

//Post Data
app.post("/add", addDataToServer);

function addDataToServer(req, res) {
  console.log("addDataToServer func. :" + req.body);
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  //closing the response
  /*status(404).end();*/
}
