const express = require("express");
const handlebars = require("express-handlebars");
const bp = require("body-parser");
const session = require("express-session");
const val = require("express-validator");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const app = express();




// Mongo database connection.
mongoose.connect("mongodb://localhost:27017/codeSnippet", function(err, connection) {
  if (err) {
    console.log("Mongo bad");
  } else {
    console.log("Mongo good");
  }
});

// Listening for port 3000.
app.listen(3000, function() {
  console.log("Start-ooo!");
});
