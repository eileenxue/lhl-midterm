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

  router.get("/options", (req, res) => {
    res.render("options");
  });

  return router;
};
