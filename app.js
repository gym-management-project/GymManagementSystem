const express = require("express");
const bodyParser = require("body-parser");
const ejs =require("ejs");
const _  = require("lodash");

const app =  express();

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded ({extended : true}));
app.use(express.static("public"));

app.get("/subscriptions",(req,res) => {
  res.render("subscriptions");
});

app.get("/addusers",(req,res) => {
  res.render("addUser");
});

app.post("/addusers",(req,res) => {
  var num = req.body;
  console.log(num);
});


app.listen(3000 , () =>{
  console.log("server is running on port 3000");
});
