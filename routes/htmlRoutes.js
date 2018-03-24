var path = require("path");


module.exports = function(app) {

  app.get("/userpage", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
  });

  app.get("/groceries", function(req, res) {
    console.log("You're in groceries now");
    res.sendFile(path.join(__dirname, "../public/groceries.html"));
  });

  app.get("/search", function(req, res){
    console.log("You are in feedbag 1.1");
    res.sendFile(path.join(__dirname, "../public/search.html"));
  })

  app.get("/notes", function(req, res){
    console.log("You are in feedbag 1.1");
    res.sendFile(path.join(__dirname, "../public/construction.html"));
  })

}
