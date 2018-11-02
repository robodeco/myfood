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
    // res.redirect('https://91e21671.ngrok.io/userpage');
    // req.user();
  });

//
authrouter.get('/facebook',
    passport.authenticate('facebook'));

  authrouter.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login' }),
    function(req, res) {
      //successsful authentication, redirect home
      res.redirect('/userpage');
    });

authrouter.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
})

module.exports = authrouter;
