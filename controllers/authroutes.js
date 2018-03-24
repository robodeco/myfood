const authrouter = require('express').Router();
const passport = require('passport');

const path = require("path");
//auth login
authrouter.get('/login',(req, res)=>{
  res.sendFile(path.join(__dirname, "../public/login.html"));

  // res.render('login');

});
//auth with google
authrouter.get('/google',passport.authenticate('google',{
scope: ['profile']
}));
//auth logout
authrouter.get('/logout', (req, res)=>{
  res.send('logging out');
})

authrouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('INSERT REDIRECT LOGIC HERE')

    //res.send(req.user)
    res.redirect('/userpage');
    // req.user();
  });

module.exports = authrouter;
