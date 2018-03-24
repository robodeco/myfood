//title animation
var basicTimeline = anime.timeline();
basicTimeline.add({
    targets: '#F',
    scale: 1.5,
    duration: 300,
    easing: 'easeOutExpo'
  })
  .add({
    targets: '#E',
    scale: 1.5,
    duration: 300,
    easing: 'easeOutExpo'
  })
  .add({
    targets: '#E2',
    scale: 1.5,
    duration: 300,
    easing: 'easeOutExpo'
  })
  .add({
    targets: '#D',
    scale: 1.5,
    duration: 300,
    easing: 'easeOutExpo'
  })
  .add({
    targets: '#B',
    scale: 1.5,
    duration: 300,
    easing: 'easeOutExpo'
  })
  .add({
    targets: '#A',
    scale: 1.5,
    duration: 300,
    easing: 'easeOutExpo'
  })
  .add({
    targets: '#G',
    scale: 1.5,
    duration: 300,
    easing: 'easeOutExpo'
  })




//firebase initialize
var config = {
  apiKey: "AIzaSyCCePhrTpJl2GV9MRff0_-3GTUs4zYB6WQ",
  authDomain: "foodcodingstarsfeed.firebaseapp.com",
  databaseURL: "https://foodcodingstarsfeed.firebaseio.com",
  projectId: "foodcodingstarsfeed",
  storageBucket: "",
  messagingSenderId: "342995053882"
};

firebase.initializeApp(config);
var database = firebase.database();
//create file in database for containing the users and their preferences
database.ref().child("Users");


//variables
var culturepick = "";
var userprefs = {
  // timeofday : "",
  culture: "",
  price: "",
  previous: ""
}
var cultures = "";
prevculture = "";
var usertemp = {
  culture: "",
  price: "",
  previous: ""
}

var cuisines = ["American", "Italian", "Mexican", "Chinese", "Thai", "Afghan", "African", "Brazilian", "Caribbean", "European", "Ethiopian", "Filipino", "Indonesian", "Japanese", "Lebanese", "Mediterranean", "Moroccan", "Peruvian", "Portuguese", "Russian", "Vietnamese", "Vegetarian", "Nepali"]
var CuisinesButtonsFinished = [];
var finalQueryURL;
var queryBaseURL = "https://developers.zomato.com/api/v2.1/";
var finalQueryURL2;
var queryBaseURL2 = "https://proxy.calweb.xyz/http://www.recipepuppy.com/api/";
var cuisineVal2 = "";
var lat;
var long;
var userprice;
var userpricerange;

//function definitions


//get the location
function getLocation() {
  if (navigator.geolocation) {
    //get location through browser (asks user with a prompt)
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    //if browser doesn't support location services
    alert("Geolocation is not supported by this browser.");
  }
}

//store current location in variables
function showPosition(position) {
  lat = position.coords.latitude.toString();
  long = position.coords.longitude.toString();
}


//create cuisine buttons
function renderbuttons() {
  //resets culturepick after a search
  culturepick = "";
  //resets values for showing in the previous search button
  cultures = "";
  //empties the buttons so user doesn't already have buttons clicked from last search
  $("#BtnDisplay").empty();
  //empties the completeled buttons array
  CuisinesButtonsFinished = [];
  //loops through the cuisines array
  for (var i = 0; i < cuisines.length; i++) {
    //creates a button
    var btns = $("<button>");
    //sets the values of the button
    var values = cuisines[i];
    //sets the button's class
    btns.addClass("btn btn-primary cuisineButton");
    //adds a checker attribute
    btns.attr("checker", "unchecked");
    //applies the button value to the button
    btns.attr("value", values);
    //labels the button for the DOM
    btns.text(cuisines[i]);
    //appends all buttons to the display in the DOM
    $("#BtnDisplay").append(btns);
    //pushes completed buttons to a completed array that can be looped through
    CuisinesButtonsFinished.push(btns);

  };
};


//if cuisine button is clicked, give it a attr of "checked". If it is unclicked,change to "unclicked"
function checkFunction() {
  //sets ischecked to attr of the button that was clicked of "checker"
  var ischecked = $(this).attr("checker");
  //if checker is not checked
  if (ischecked === "unchecked") {
    //change attr to checked
    $(this).attr("checker", "checked");
    //change class to active to show on the DOM it has been clicked
    $(this).attr("class", "btn btn-primary cuisineButton active")
    //if checker is checked
  } else {
    //change attr to unchecked
    $(this).attr("checker", "unchecked");
    //remove the active class so the button appears unclicked
    $(this).attr("class", "btn btn-primary cuisineButton")
  }
}





//***********************************************************************************************************************************************************************************
// Previous User Search/signin stuff
//***********************************************************************************************************************************************************************************

$.get("/user", username);
function username(data){
$("#usernamedisplay").append("Welcome " + data.username);
}


$("#signinorout").empty();
var submitrestfavsbtn = $("<button id = restfvbtn>");
submitrestfavsbtn.addClass("btn btn-primary signbutton");
submitrestfavsbtn.text("Submit Favorite Restaurants!");
submitrestfavsbtn.attr("data-toggle", "modal");
$("#signinorout").append(submitrestfavsbtn);

var favrestvar = [];
var previousfavrest = [];

$.get("/api/restaurants", getpreviousrestaurants);

function getpreviousrestaurants(data) {
  for (l = 0; l < data.length; l++) {
    previousfavrest.push(data[l].name)


  }
console.log(previousfavrest);
}

$("#restfvbtn").on("click", function() {
event.preventDefault();
$("#restfvbtn").attr("data-target", "#fvmodal");
$(".restfavorited").each(function(index) {
  newrest = {
    name: $(this).attr("name"),
    link: $(this).attr("link"),
    location: $(this).attr("location")

  }
  favrestvar.push(newrest);
});
if (fvalidate() == false) {
  return;
}
$("#fvmodalbody").empty();
//loop through favoritesvar and submit each new recipe
for (i = 0; i < favrestvar.length; i++) {
  for (k = 0; k < previousfavrest.length; k++) {
    if (favrestvar[i].name === previousfavrest[k]) {
      console.log("match");
      $("#fvmodalbody").append(favrestvar[i].name + " has already been favorited and was not added. <p> </p> Any other favorites could not be added, please unselect " + favrestvar[i].name + " and try again!");
      favrestvar.splice(favrestvar[i]);
      return
    }
  }
  submitRestaurant(favrestvar[i]);
  previousfavrest.push(favrestvar[i].name);

  $("#fvmodalbody").append(favrestvar[i].name + " Has been added to your favorites! <p></p>");
  console.log(favrestvar);
}
//empty favorites var
favrestvar.length = 0;



});

function submitRestaurant(restaurant) {
  console.log("running");
  $.post("/api/restaurants", restaurant, function() {

  });
}




//create favorites button using former previous button position, template, and attrs
$("#prevresults").empty();
var submitfavsbtn = $("<button id=fvbtn>");
submitfavsbtn.addClass("btn btn-primary previousbutton");
submitfavsbtn.text("Submit Favorite Recipes!");
submitfavsbtn.attr("data-toggle", "modal");
$("#prevresults").append(submitfavsbtn);

//initialize array of favorited recipes
var favoritesvar = [];
var previousfavorites = [];

$.get("/api/recipes", getpreviousrecipes);

function getpreviousrecipes(data) {
  for (j = 0; j < data.length; j++) {
    previousfavorites.push(data[j].title)

  }

}

var homebutton = $("<a href = /userpage>")
homebutton.append("<button>")

homebutton.addClass("btn btn-primary previousbutton");
homebutton.text("Favorites Page!");
homebutton.append("</button>");
homebutton.append("</a>")
$("#prevresults").append(homebutton);


//click handler for submitting favorites
$("#fvbtn").on("click", function() {
  event.preventDefault();
  //trigger modal
  $("#fvbtn").attr("data-target", "#fvmodal");

  function pickfavrecipes() {
    //scan through the DOM looking for divs with a class of "favorited"
    $(".favorited").each(function(index) {
      //push div's attr's into a new recipe object
      newrecipe = {
        title: $(this).attr("title"),
        href: $(this).attr("href"),
        thumbnail: $(this).attr("thumbnail"),
        ingredients: $(this).attr("ingredients")
      }
      //push recipe objects into the favorites array
      favoritesvar.push(newrecipe);


    });
    //validate there are favorites in the arry, if not, break
    if (fvalidate() == false) {

      return;
    }

    $("#fvmodalbody").empty();

    //loop through favoritesvar and submit each new recipe

    for (i = 0; i < favoritesvar.length; i++) {
      for (k = 0; k < previousfavorites.length; k++) {
        if (favoritesvar[i].title === previousfavorites[k]) {
          console.log("match");
          $("#fvmodalbody").append(favoritesvar[i].title + " has already been favorited and was not added. <p> </p> Any other favorites could not be added, please unselect " + favoritesvar[i].title + " and try again!");
          favoritesvar.splice(favoritesvar[i]);
          return
        }
      }
      submitRecipe(favoritesvar[i]);
      previousfavorites.push(favoritesvar[i].title);

      $("#fvmodalbody").append(favoritesvar[i].title + " Has been added to your favorites! <p></p>");
      console.log(favoritesvar);
    }
    //empty favorites var
    favoritesvar.length = 0;
  }
  //call function
  pickfavrecipes();
});

//post for posting new favorite recipes
function submitRecipe(recipe) {
  console.log("running");
  $.post("/api/recipes", recipe, function() {

  });
}

//validation for favorites
function fvalidate() {
  if (favoritesvar.length == 0 && favrestvar.length == 0) {
    console.log("array is empty");
    $("#fvmodalbody").empty();
    $("#fvmodalbody").append("You have not selected any favorites!");
    return false;
  }
}

//***********************************************************************************************************************************************************************************
// ^^^^^^^^ Previous User Search/signin stuff ^^^^^^^
//***********************************************************************************************************************************************************************************



//defines what happens when previous search button is clicked
function previousbuttonfunction() {
  //sets userprice to 0
  userprice = 0;
  //sets culturepick to previous cultures picked
  culturepick = prevculture;
  //sets userprice to the previous price
  userprice = previousprice;
  //calls all api's using above previous values
  restuarantsapi();
  recipesapi();
  //calls the buttons to reset
  renderbuttons();
}


//loop through buttons for "checked" function. If there, add value to culture(s) picked
function GetCuisinePrefs() {
  for (var j = 0; j < CuisinesButtonsFinished.length; j++) {
    //defines checked or unchecked within the button attrs as a variable
    var newchecker = CuisinesButtonsFinished[j].attr("checker");
    //if attr is checked
    if (newchecker === "checked") {
      //add the value to cultures and culturepick. Cultures shows in previous terms with the &, culturepick is operational for the APIs
      cultures += CuisinesButtonsFinished[j].val().trim() + ", ";
      culturepick += CuisinesButtonsFinished[j].val().trim().toLowerCase() + "&";
    };
  };
};



//restaurant API call
function restuarantsapi() {

  finalQueryURL = queryBaseURL + "search?q=" + culturepick + "lat=" + lat + "&lon=" + long + "&count=5";
  //ajax call
  $.ajax({
      url: finalQueryURL,
      method: "GET",
      headers: {
        "user-key": "b585192e1aca10c32e449a9b7c13f1cd"
      }
    })

    .done(function(response) {
      //empty the previous search
      $("#restaurants").empty();
      // store results in a variable
      var restresults = response.restaurants;
      console.log(restresults);

      //loop through results
      for (var i = 0; i < restresults.length; i++) {
        //create a DIV to hold all restuarant info
        var restcontainer = $("<div class = 'countries'>");

        var restlist = {
          name: restresults[i].restaurant.name,
          link: restresults[i].restaurant.url,
          location: restresults[i].restaurant.location.address,
          price: restresults[i].restaurant.price_range,
          favorite: "<img class= 'favicon' src = '../imgs/fvicon.png' height = '30px' width = '30px' fav= 'no' rest = 'yes' >"
        }

        restcontainer.attr("name", restlist.name);
        restcontainer.attr("link", restlist.link);
        restcontainer.attr("location", restlist.location);

        //runs the priceing function that determins the price range (1-4) of the user's input amount
        priceranges();
        //function to check if the user's price range is below results
        function pricechecker() {
          //if user price range is less than the range of the restuarant, return false
          if (userpricerange < restlist.price) {
            return false;
          }
        }
        //call the pricechecker function
        pricechecker();


        restcontainer.prepend(restlist.favorite);
        //prepend the link created above
        restcontainer.prepend("<a class='links' href = '" + restlist.link + "' target='_blank'>" + restlist.name + "</a>");
        //append an empty paragraph for space
        restcontainer.append("<p>");
        //append the location
        restcontainer.append(restlist.location);
        //check if pricecheker returned false
        if (pricechecker() != false) {
          //if pricechecker did not return false, restauran is within price range and is shown
          $("#restaurants").append(restcontainer);
        }
        //end the for loop
      }
      //if no results returned, append message
      if( $('#restaurants').is(':empty') )  {
        console.log("running");
        var emptycontainer = $("<div class ='countries norestresults' >")
        $(emptycontainer).append("Oh No! Looks like there are no viable restaurants near you! Try again or pick a recipe!")
        $("#restaurants").append(emptycontainer);
      }
      //end response function
    });
}



//recipe API call
function recipesapi() {
  finalQueryURL2 = queryBaseURL2 + "?q=" + culturepick + "&count=5" + "&oi=1";

  $.ajax({
      url: finalQueryURL2,
      method: "GET",
    })
    .done(function(response) {
      $("#recipes").empty();
      var recipes = JSON.parse(response)

      var recipeArr = recipes.results;

      for (var i = 0; i < recipeArr.length; i++) {
        var recipecontainer = $("<div class='reciperesponse'>")

        var reciperes = {
          title: recipeArr[i].title,
          link: recipeArr[i].href,
          thumb: "<img class=recipeimg src=" + String(recipeArr[i].thumbnail) + '>',
          ingredients: recipeArr[i].ingredients,
          favorite: "<img class= 'favicon' src = '../imgs/fvicon.png' height = '30px' width = '30px' fav= 'no' rest='no' >",

        }

        recipecontainer.attr("href", reciperes.link);
        recipecontainer.attr("title", reciperes.title);
        recipecontainer.attr("ingredients", reciperes.ingredients);
        recipecontainer.attr("thumbnail", String(recipeArr[i].thumbnail));




        recipecontainer.append("<p></p>");
        recipecontainer.append(reciperes.favorite);
        recipecontainer.append("<a class = 'links' href= '" + reciperes.link + "'target='_blank'>" + reciperes.title + "</a>");
        recipecontainer.append("<p></p>")
        recipecontainer.append(reciperes.ingredients);
        recipecontainer.prepend(reciperes.thumb);
        // recres.push(recipecontainer);

        $("#recipes").append(recipecontainer);

      }
    })
}



//function for favorites
function favorites() {
  var isfavorites = $(this).attr("fav");
  var type = $(this).attr("rest");
  if (isfavorites === "no") {
    $(this).attr("fav", "yes");
    if (type == 'no') {
      $(this).parent().addClass("favorited");
    } else {
      $(this).parent().addClass("restfavorited");
    }
    $(this).attr("src", "./imgs/fviconactive.png");
  } else {
    $(this).attr("fav", "no");
    $(this).parent().removeClass("favorited");
    $(this).parent().removeClass("restfavorited");
    $(this).attr("src", "./imgs/fvicon.png")
  }
}

$(document).on("click", ".favicon", favorites);





//validation of user input
function validate() {
  //set the userprice to the user price input
  userprice = $("#inlineFormInputGroup").val().trim();
  //if user price is not a number, is not filled our, or no cultures are picked
  if ((isNaN(userprice)) || (userprice == "") && (culturepick == "")) {
    //trigger a modal
    $("#submit").attr("data-target", "#invalid3")

    return false;
    //if user price is not a number or filled out incorrectly
  } else if ((isNaN(userprice)) || (userprice == "")) {
    //trigger a modal
    $("#submit").attr("data-target", "#invalid");

    return false;
    //if no cultures picked
  } else if (culturepick == "") {
    //trigger a modal
    $("#submit").attr("data-target", "#invalid2")

    return false;
    //if cultures are picked and price is input
  } else {
    //no modals
    $("#submit").attr("data-target", "#success");
    return true;
  }
}

//takes user price input and arbitrarily grades on scale of 1-4 per Restaurant API ratings
function priceranges() {
  //if less than or equal to 25 rating is 1
  if (userprice <= 25) {
    userpricerange = 1;
    //if less than or equal to 50 rating is 2
  } else if (userprice <= 50) {
    userpricerange = 2;
    //if less than or equal to 75 rating is 3
  } else if (userprice <= 75) {
    userpricerange = 3;
    //anything greather than 76 rating is 4
  } else if (userprice >= 76) {
    userpricerange = 4;
  }

}


//call independent functions
getLocation();
renderbuttons();





//clickhandlers
//click handler for all cuisine buttons to run the check function
$(document).on("click", ".cuisineButton", checkFunction);

//click handler for using the previous search terms entered
// $(document).on("click", ".previousbutton", previousbuttonfunction);




//submit button for new search
$("#submit").on("click", function() {

  event.preventDefault();
  //loops through buttons looking for checked attrs and adding to culturepicker
  GetCuisinePrefs();
  //validation
  validate();
  //only run if validate returns true
  if (validate() == true) {
    $("#inlineFormInputGroup").val("");
    //push the terms of the last search to firebase
    userprefs.culture = usertemp.culture;
    userprefs.previous = usertemp.previous;
    userprefs.price = usertemp.price;
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref('Users/' + user.displayName).set(userprefs);
    });
    //store the current search terms in a temp object that will be pushed to firebase on the next click of submit or on reload
    usertemp.culture = culturepick;
    usertemp.previous = cultures;
    usertemp.price = userprice;
    //call API's and render the buttons
    restuarantsapi();
    recipesapi();

    renderbuttons();

    // console.log(recres);


  }
})


//should the user click refresh without doing another search, the temp userobject is pushed to firebase to become the "previous search"
$(window).on("unload", function() {
  if (usertemp.culture != "") {
    userprefs.culture = usertemp.culture;
    userprefs.previous = usertemp.previous;
    userprefs.price = usertemp.price;
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref('Users/' + user.displayName).set(userprefs);
    });
  };
})

// });
