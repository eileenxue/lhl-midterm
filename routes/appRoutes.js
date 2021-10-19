const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET ROUTES ****************************

  router.get("/", (req, res) => {
    res.render("index");
  });
  // CREATE GET ROUTES
  router.get("/create", (req, res) => {
    res.render("create");
  });

  // OPTIONS GET ROUTES
  router.get("/options", (req, res) => {
    res.render("options");
  });

  // EVENT GET ROUTES
  router.get("/event", (req, res) => {
    res.render("event");
  });

  //OPTIONS ROUTE WITH SPECIFIC eventID
  router.get("/options/:eventID", (req, res) => {
    const templateVars = { eventID: req.params.eventID };
    res.render("options", templateVars);
  });

  // EVENT ROUTE WITH SPECIFIC eventID
  router.get("/event/:eventID", (req, res) => {
    const event_id = req.params.eventID;
    let stringQuery = `
    SELECT users.name as user_name, events.title as event_title , events.location as event_location, events.description as event_description, events.url as event_url
    FROM events
    JOIN users ON events.user_id = users.id
    WHERE events.id = $1;
    `;
    const queryParams = [event_id];

    return db
      .query(stringQuery, queryParams)
      .then((dbres) => {
        console.log(dbres.rows);
        res.render("event");
      })
      .catch((err) => console.log(err));
  });

  // Use for TESTING to see if existing database info can be rendered onto page
  // Once we get this working, get the custom URL working (see above)
  // Remove this at the end when testing finished
  router.get("/event/test", (req, res) => {
    res.render("event");
  });

  // POST ROUTES ********************************

  // function to create random url
  function generateRandomString() {
    let text = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 6; i++) {
      text += str.charAt(Math.floor(Math.random() * str.length));
    }
    return text;
  }

  router.post("/create", (req, res) => {
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
          .then((data) => {
            console.log("data", data.rows);
            const event_id = data.rows[0].id;
            res.redirect(`/options/${event_id}`);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => err);
    // return db
    //   .query(queryString1, queryParams1)
    //   .then((res) => res.rows[0])
    //   .catch((err) => err);
  });
  router.post("/options/:eventID", (req, res) => {
    const event_id = req.params.eventID;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    console.log(event_id);
    console.log(start_time);
    console.log(end_time);
    const queryParams1 = [event_id, start_time, end_time];
    let queryString1 = `INSERT INTO timeslots (event_id, start_time, end_time) VALUES ($1, $2, $3) RETURNING *`;
    return db
      .query(queryString1, queryParams1)
      .then((resdb) => {
        const event_id = resdb.rows[0].event_id;
        return db
          .then(() => res.redirect(`/event/${event_id}`))
          .catch((err) => console.log(err));
      })
      .catch((err) => err);
  });

  return router;
};
