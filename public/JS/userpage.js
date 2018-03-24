function getusername() {
  $.get("/user", username);

  function username(data) {
    $("#displayName").append("<h4 class=card-title>" + data.username + "</h4>")
  }
}

function getrecipes() {
  $.get("/api/recipes", favoritedrecipes)

  function favoritedrecipes(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var recipecontainer = $("<div class = reccontainers>")
      recipecontainer.append("<p></p>");
      recipecontainer.append("<img src = " + data[i].thumbnail + ">");
      recipecontainer.append("<a class = 'links' href= '" + data[i].href + "'target='_blank'>" + data[i].title + "</a>");
      recipecontainer.append("<p></p>")
      recipecontainer.append(data[i].ingredients);
      // recipecontainer.prepend(data.thumbnail);
      $("#display").append(recipecontainer);
    }
  }
}

function getrest() {
  $.get("/api/restaurants", favrests)

  function favrests(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {

    }
  }
}

getusername();
getrecipes();
getrest();
