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

  /*router.get("/options/:eventID", (req, res) => {
    const valueAsKey = function(hours, minutes) {
      let time = Math.floor(hours/12) == 1 ? 'PM' : 'AM';
      return ((hours+11) % 12 + 1) + ":" + (minutes < 10 ? '0' : "") + minutes + ' ' + time;
    }
    let times = [];
    for (let i = 0 ; i < 24; i++) {
        for(let j = 0; j < 60; j += 30) {
            let value = (i < 10 ? '0' : '') + i + ":" + (j == 0 ? "00" : j);
            const key = valueAsKey(i, j);
            if(times.length > 0) {
                times[times.length-1][1] += " - " + key;
            }
            times.push([value, key]);
        }
    }
    times[47][1] += " - 12:00 AM";
    const templateVars = { eventID: req.params.eventID, timesList: times };
    res.render("options", templateVars);
  });*/

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
