
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");
const FacebookStrategy = require("passport-facebook").Strategy;
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(session({
  secret: "Ourlittesecret",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/user/calculator",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"

  },
  function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/user/calculator"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));
//conection to database

mongoose.connect("mongodb+srv://Admin-shary:projectgym@cluster0.gul6g.mongodb.net/subscriberDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

//schema

const userSchema = new mongoose.Schema({
  password: String,
  googleId: String,
  facebookID : String,
  fname: String,
  lname: String,
  pnum1: Number,
  pnum2: Number,
  hno: String,
  city: String,
  dob: String,
  sex: String,
  //username = email
  username: String,
  profilepic: {
    data: Buffer,
    contentType: String,
  },
  famName: String,
  relation: String,
  famPnum: Number,
  boneInjury: String,
  disease: String,
  package: Number,
  type: String,
  startDate: Date,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    var filenam = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, filenam);
  }
});
const upload = multer({
  storage: storage
}).single("profilepic");


app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("calculators");
  } else {
    res.render("index");
  }
});
app.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile"]
  }));
  app.get('/auth/facebook',
  passport.authenticate('facebook',{
    scope : ["email"]
  }));

  app.get('/auth/google/user/calculator',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/user/calculator');
  });

  app.get('/auth/facebook/user/calculator',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/user/calculator');
  });

app.get("/login", (req, res) => {
  res.render("authentication");
});
app.get("/register", (req, res) => {
  res.render("authentication");
});
app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err) {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/user/calculator")
      });
    }
  });
});
app.post("/register", (req, res) => {
  console.log(req.body.username);
  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/user/calculator");
      });
    }
  });
});
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
})
app.get("/subscriptions", (req, res) => {
  if (req.isAuthenticated()) {
    User.find({
      "fname": {
        $ne: null
      }
    }, (err, users) => {
      console.log(users.length);
      res.render("subscriptions", {
        users: users,
      });
    });
  } else {
    res.redirect("/login");
  }

});
app.get("/subscriptions/:id", (req, res) => {
  if (req.isAuthenticated()) {
    User.findOne({
      _id: req.params.id
    }, (err, foundUser) => {
      if (foundUser) {

        var dateToday = new Date();
        monthToday = dateToday.getMonth();
        var endDate = foundUser.package + foundUser.startDate.getMonth();

        var remainingMonths = Math.floor(endDate - monthToday) - 1;
        var remainingDays = (30 * (foundUser.package) - dateToday.getDate()) % 30;
        //
        // if(remainingMonths<=0 && remainingDays==)


        res.render("userInfo", {
          foundUser: foundUser,
          remainingMonths: remainingMonths,
          remainingDays: remainingDays
        });
      } else {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }

});
app.post("/subscriptions/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    User.update({
      _id: id
    }, {
      $set: req.body
    }, (err) => {
      if (!err) {
        res.redirect("/subscriptions");
        console.log("successfully updated");
      } else {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }

});
app.post("/delete/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const del_id = req.params.id;
    console.log(del_id);
    User.deleteOne({
      _id: del_id
    }, (err) => {
      if (!err) {
        res.redirect("/subscriptions");
        console.log("successfully deleted");
      } else {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }

});
app.get("/addusers", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("addUser");
  } else {
    res.redirect("/login");
  }

});
app.post("/addusers", upload, (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = new User({
      fname: _.capitalize(req.body.fname),
      lname: _.capitalize(req.body.lname),
      pnum1: req.body.pnum1,
      pnum2: req.body.pnum2,
      hno: req.body.hno,
      city: req.body.city,
      dob: req.body.dob,
      sex: req.body.sex,
      username: req.body.email,
      profilepic: {
        data: fs.readFileSync(path.join(__dirname + '/public/uploads/' + req.file.filename)),
        contentType: 'image/png' || 'image/jpeg' || 'image/jpg'
      },
      famName: req.body.famName,
      relation: req.body.relation,
      famPnum: req.body.famPnum,
      boneIngury: req.body.boneInjury,
      disease: req.body.disease,
      package: req.body.package,
      type: req.body.type,
      startDate: req.body.startDate
    });
    user.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("inserted successfully");
        res.redirect("/subscriptions")
      }
    });
  } else {
    res.redirect("/login");
  }

});
app.get("/attendance", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("attendance");
  } else {
    res.redirect("/login");
  }

});
app.get("/user/calculator", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("calculators");
  } else {
    res.redirect("/login");
  }
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, () => {
  console.log("server is running on port 3000");
});
