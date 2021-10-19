// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express("require");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + "/public/scripts"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const appRoutes = require("./routes/appRoutes");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", appRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

function generateRandomString() {
  let text = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 8; i++) {
    text += str.charAt(Math.floor(Math.random() * str.length));
  }
  return text;
}

app.post("/create", (req, res) => {
  // We get the data into the form fields
  const name = req.body.name;
  const email = req.body.email;
  const title = req.body.title;
  const description = req.body.description;
  const location = req.body.location;
  console.log(name);
  console.log(email);

  const queryParams1 = [name, email];
  let queryString1 = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`;

  // const queryParams2 = [title, description, location];
  let queryString2 = `INSERT INTO events (user_id, title, description, location, url) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  // const listOfQueries = [
  //   db.query(queryString1, queryParams1),
  //   db.query(queryString2, queryParams2),
  // ];

  // return Promise.all(listOfQueries)
  //   .then((results) => {
  //     console.log(results);
  //   })
  //   .catch((err) => console.log(err));

  return db
    .query(queryString1, queryParams1)
    .then((resdb) => {
      console.log(resdb.rows[0].id);
      const url = generateRandomString();
      const user_id = resdb.rows[0].id;
      const queryParams2 = [user_id, title, description, location, url];
      return db
        .query(queryString2, queryParams2)
        .then(() => res.redirect("/options"))
        .catch((err) => console.log(err));
    })
    .catch((err) => err);

  // return db
  //   .query(queryString1, queryParams1)
  //   .then((res) => res.rows[0])
  //   .catch((err) => err);
});

app.post;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
