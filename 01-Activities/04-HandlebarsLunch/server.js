// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
// Create an instance of the express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Data
var lunches = [
  {
    lunch: "Beet & Goat Cheese Salad with minestrone soup."
  }, {
    lunch: "Pizza, two double veggie burgers, fries with a Big Gulp"
  }
];

// Routes
app.get('/', function(req, res){
  res.render('index', {title: "Chris's Lunch", condition: 0, anArray: [1,2,3]})
})


app.get("/weekday", function(req, res) {
  res.render("index", lunches[0]);
});

app.get("/weekend", function(req, res) {
  res.render("index", lunches[1]);
});

app.get("/lunches", function(req, res) {
  res.render("all-lunches", {
    foods: lunches,
    eater: "david"
  });
});

app.get('/test/:id', function(req, res){
  res.render('post', {title: 'You got here via a Post Request', output:req.params.id});
  
})

app.post('/test/submit', function(req, res){
  var id = req.body.id;
  res.redirect('/test/' + id);
  
});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
