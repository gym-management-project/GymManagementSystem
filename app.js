//mongod atlas   username - Admin-shray
//               password - projectgym
// heroku        id - projrctfirstgym@gmail
//               password - project1@
//heroku app nname  - warm-headland-44525
const express = require("express");
const bodyParser = require("body-parser");
const ejs =require("ejs");
const _  = require("lodash");
const mongoose =require("mongoose");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app =  express();

const userSchema = {
     fname : String,
     lname : String,
     pnum1 : Number,
     pnum2 : Number,
     hno : String,
     city : String,
     dob : String,
     sex : String,
     email : String,
     profilepic : {
        data: Buffer,
        contentType: String,
    },
     famName : String,
     relation : String,
     famPnum : Number,
     boneIngury : String,
     disease : String,
     package : Number,
     type : String,
     startDate : Date,
}




mongoose.connect("mongodb+srv://Admin-shary:projectgym@cluster0.gul6g.mongodb.net/subscriberDB",{useNewUrlParser :true ,useUnifiedTopology : true});
const User = mongoose.model("User",userSchema);

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        var filenam =file.fieldname + '-' + Date.now()+path.extname(file.originalname);
        cb(null, filenam);
    }
});

const upload = multer({ storage: storage }).single("profilepic");


app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded ({extended : true}));
app.use(express.static("public"));


app.get("/autocomplete/",(req,res,next) => {
       var regex  =  new RegExp(req.query["term"],'i');
       var nameFilter = User.find({fname : regex  } , {'fname' : 1, 'lname' :1}).sort({"updated_at" : -1}).sort({"created_at":-1});
       nameFilter.exec((err,data) =>{

         var result = [];
         if(!err){
           if(data && data.length>0){
             data.forEach(user => {
               let obj  =  {
                 id : user._id ,
                 label : user.fname
               };
               result.push(obj);
             });
           }
            console.log(result);
           res.jsonp(result);
         }
       });
})




app.get("/subscriptions",(req,res) => {
  User.find({},(err,users) => {
     console.log(users.length);
     res.render("Subscriptions",{
         users : users,

     });

  });

});




app.get("/subscriptions/:id" ,(req,res) =>{
   User.findOne({_id : req.params.id},(err,foundUser) => {
       if(foundUser){
         res.render("userInfo",{
           foundUser : foundUser
         });
       }
       else{
         console.log(err);
       }
   });
});
app.post("/subscriptions/:id" ,(req,res) =>{
  const id = req.params.id;
    User.update({_id : id} ,{$set : req.body},(err) =>{
      if(!err){
        res.redirect("/subscriptions");
        console.log("successfully updated");
      }
      else{
        console.log(err);
      }
  });
});


app.post("/delete/:id",(req,res) =>{
      const del_id = req.params.id;
      console.log(del_id);
      User.deleteOne({_id : del_id} ,(err) =>{
        if(!err){
          res.redirect("/subscriptions");
          console.log("successfully deleted");
        }
        else{
          console.log(err);
        }
    });
});




app.get("/addusers",(req,res) => {
  res.render("addUser");
});

app.post("/addusers",upload,(req,res,next) => {
     const user = new User({
        fname : _.capitalize(req.body.fname) ,
        lname : _.capitalize(req.body.lname),
        pnum1 : req.body.pnum1,
        pnum2 : req.body.pnum2,
        hno : req.body.hno,
        city : req.body.city,
        dob : req.body.dob,
        sex : req.body.sex,
        email : req.body.email,
        profilepic : {
            data: fs.readFileSync(path.join(__dirname + '/public/uploads/' + req.file.filename)),
            contentType: 'image/png' || 'image/jpeg' || 'image/jpg'
        },
        famName : req.body.famName,
        relation : req.body.relation,
        famPnum : req.body.famPnum,
        boneIngury : req.body.boneIngury,
        disease : req.body.disease,
        package : req.body.package,
        type : req.body.type,
        startDate : req.body.startDate
     });
     user.save((err) =>{
       if(err){
         console.log(err);
       }
       else{
         console.log("inserted successfully");
         res.redirect("/subscriptions")
       }
     });
});





app.get("/attendance" , (req,res)=>{
  res.render("attendance");
});






app.get("/user/calculator",(req,res) => {
  res.render("calculators");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);

app.listen(port, () =>{
  console.log("server is running on port 3000");
});
