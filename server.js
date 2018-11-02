const express = require ('express');
const authRoutes = require('./controllers/authroutes');
const passportSetup = require('./config/passport-setup');
var db = require('./models');
var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
const app = express();


app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passportSetup.initialize());
app.use(passportSetup.session())
require("dotenv").config();


//set up view engine
// app.set('view engine','ejs');

//set up authRoutes
app.use('/auth',authRoutes);



// Serve static content for the app from the "public" directory in the application directory.

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded

// app.get('/',(req,res)=>{
//   res.render('home');
// });
app.get("/user", function(req, res) {
  res.status(200).json({username:req.user.username})
});


require("./routes/api-routes.js")(app);
require("./routes/htmlroutes.js")(app);
var routes = require("./controllers/routes.js");
app.use(express.static('public'));
app.use(routes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(process.env.PORT || 3000, function() {
    console.log("App listening on PORT " + PORT);
  });
});
