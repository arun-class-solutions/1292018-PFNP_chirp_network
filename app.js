//Require modules and models

var express = require("express");
var models = require("./models/index");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

//Set view engine

app.set("view engine", "ejs");

//Middleware

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.redirect(301, "/chirps");
});

// Representational State Transfer (REST)
// GET Request -> Read
// POST Request -> Create
// PUT Request -> Update
// DELETE Request -> Destroy

//Get all chirps
app.get("/chirps", (req, res) => {
  // Step 1: Query the database and retrieve all of the chirps
  // Step 2: Generate HTML with chirps inside
  // Step 3: Send back completed HTML to the browser
  models.Chirp.findAll().then((chirps) => {
    res.render("index", { chirps });
  });
  // Visit your site at: http://localhost:3000/chirps
});

//Create new chirp
app.post("/chirps", (req, res) => {
  // Step 1: Retrieve new chirp from the form submission
  // Step 2: Create new record in the database with new chirp
  // Step 3: Redirect to GET /chirps
  var newChirp = req.body;

  models.Chirp.create(newChirp).then(() => {
    res.redirect("/chirps");
  });
});

//Get specific chirp
app.get("/chirps/:id/edit", (req, res) => {
  // Step 1: Retrieve specific chirp via its ID from the database
  // Step 2: Generate HTML with specific chirp inside
  // Step 3: Send back completed HTML to the browser
  var chirpId = req.params.id;

  models.Chirp.findById(chirpId).then((chirp) => {
    res.render("edit", { chirp });
  });
});

//Edit a chirp
app.put("/chirps/:id", (req, res) => {
  // Step 1: Retrieve updated chirp text from form submission
  // Step 2: Retrieve specific chirp via its ID from the database
  // Step 3: Update specific chirp with new text
  // Step 4: Redirect back to GET /chirps
  var updatedChirp = req.body;
  var chirpId = req.params.id;

  models.Chirp.findById(chirpId).then((chirp) => {
    chirp.updateAttributes(updatedChirp).then(() => {
      res.redirect("/chirps");
    });
  });
});

//Delete a chirp
app.delete("/chirps/:id", (req, res) => {
  // Step 1: Retrieve specific chirp via its ID from the database
  // Step 2: Destroy specific chirp
  // Step 3: Redirect back to GET /chirps
  var chirpId = req.params.id;

  models.Chirp.findById(chirpId).then((chirp) => {
    chirp.destroy().then(() => {
      res.redirect("/chirps");
    });
  });
});

app.listen(process.env.PORT || 3000);
