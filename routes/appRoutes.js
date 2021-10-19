const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/users", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/create", (req, res) => {
    res.render("create");
  });

  router.get("/options", (req, res) => {
    const templateVars = {};
    res.render("options", templateVars);
  });

  router.get("/event/:customURL", (req, res) => {
    // Get the custom generated URL
    res.render("event");
  });

  // Use for TESTING to see if existing database info can be rendered onto page
  // Once we get this working, get the custom URL working (see above)
  // Remove this at the end when testing finished
  router.get("/event/test", (req, res) => {
    res.render("event");
  });

  return router;
};
