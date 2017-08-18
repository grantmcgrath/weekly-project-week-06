const express = require("express");
const handlebars = require("express-handlebars");
const bp = require("body-parser");
const session = require("express-session");
const val = require("express-validator");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const passport = require("passport");
const bcrypt = require("bycryptjs");


const app = express();

// Schema models
const Snippet = require("./models/snippet");
const User = require("./models/user");

//Routes
const accountRoute = require("./routes/account");
const mainRoute = require("./routes/main");
const searchRoute = require("./routes/search");

app.use("/", accountRoute);
app.use("/", mainRoute);
app.use("/", searchRoute);

//Static files.
app.use(express.static("public"));

//Template engine.
app.engine("handlebars", handlebars());
app.set("views", "./views");
app.set("view engine", "handlebars");

//Parsing
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

//Express session.
app.use(session({
  secret: "ninja",
  resave: false,
  saveUninitialized: true
}));

//Validation
app.use(val());

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Checks for login status and redirects if not loged in.
const loggedIn = function(req, res, next) {
  if (!req.user) {
    res.redirect("/login");
  } else {
    next();
  }
};

app.get("/", loggedIn, function (req, res) {
  Snippet.find({})
    .then(function(snippet) {
      res.render("home", {user})
    })
})

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  let user = new User(req.body);
  user.provider = "local";
  user.setPassword(req.body.password);
  user.save()
    .then(function() {res.redirect("/"))
    .catch(err => console.log(err));
  });


// Mongo database connection.
mongoose.connect("mongodb://localhost:27017/codeSnippet", function(err, connection) {
  if (err) {
    console.log("Mongo bad", err);
  } else {
    console.log("Mongo good");
  }
});

// Listening for port 3000.
app.listen(3000, function() {
  console.log("Start-o!");
});
