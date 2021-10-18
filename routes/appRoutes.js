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

  router.get("/summary", (req, res) => {
    const templateVars = {};
    res.render("summary", templateVars);
  });

  return router;
};
