// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================

//pushing user to user table

module.exports = function(app) {
  app.post("/api/users", function(req, res){
    db.User.create(req.body).then(function(dbUser){
      res.json(dbUser);
    })
  });

//deleting users
  app.delete("/api/users/:id", function(req, res){
    db.User.destroy({
      where:{
        id: req.params.id
      }
    }).then(function(dbUser){
      res.json(dbUser);
    })
  })

app.get("/api/recipes", function(req, res){
  db.Recipe.findAll({}).then(function(dbRecipe){
    res.json(dbRecipe);
  })
});

app.get("/api/restaurants", function(req, res){
  db.Restaurant.findAll({}).then(function(dbRestaurant){
    res.json(dbRestaurant);
  })
});

app.post("/api/restaurants", function(req, res){
  db.Restaurant.create({
    name: req.body.name,
    link: req.body.link,
    location: req.body.location
  }).then(function(dbRestaurant){
    res.json(dbRestaurant);
  });
});

//pushing recipe to recipe table
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create({
      title: req.body.title,
      href: req.body.href,
      ingredients: req.body.ingredients,
      thumbnail: req.body.thumbnail
    }).then(function(dbRecipe){
      res.json(dbRecipe);
    });
  });

  // GET route for getting all of the todos
  app.get("/api/todos", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Todo.findAll({}).then(function(dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
  });

  // POST route for saving a new todo
  app.post("/api/todos", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Todo.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbTodo) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbTodo);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/todos/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Todo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/todos", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Todo.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

};
