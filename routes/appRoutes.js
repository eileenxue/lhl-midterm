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
  // router.get("/options", (req, res) => {
  //   res.render("options");
  // });

  // EVENT GET ROUTES
  // router.get("/event", (req, res) => {
  //   res.render("event");
  // });

  //OPTIONS ROUTE WITH SPECIFIC eventID
  // router.get("/options/:eventID", (req, res) => {

  //   const templateVars = { eventID: req.params.eventID };
  //   res.render("options", templateVars);
  // });

  // EVENT ROUTE WITH SPECIFIC eventID
  router.get("/event/:eventID", (req, res) => {
    const event_id = req.params.eventID;
    let stringQuery = `
    SELECT DISTINCT users.name as user_name, events.title as event_title , events.location as event_location, events.description as event_description, events.url as event_url, timeslots.event_id as event_id, timeslots.date_time as date_time, timeslots.id as timeslot_id
    FROM events
    JOIN users ON events.user_id = users.id
    JOIN timeslots ON events.id = timeslots.event_id
    WHERE event_id = $1
    GROUP BY events.id, users.name, timeslots.id;
    `;
    const queryParams = [event_id];

    return db
      .query(stringQuery, queryParams)
      .then((dbres) => {
        console.log(dbres.rows);
        res.render("event", {events: dbres.rows});
      })
      .catch((err) => console.log(err));
  });

  router.get("/options/:eventID", (req, res) => {

    const event_id = req.params.eventID;
    const queryParams = [event_id];

    const templateVars = { eventID: req.params.eventID };
    res.render(`options`, templateVars);

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
    const date_time = req.body["date-time"];
    let queryString1 = `INSERT INTO timeslots (event_id, date_time) VALUES ($1, $2) RETURNING *`;
    const promises = [];
    for (let element of date_time) {
      const promise = db.query(queryString1, [event_id, element]);
      promises.push(promise);
    }
    Promise.all(promises).then(function() {
      res.redirect(`/event/${event_id}`);
    }).catch((err) => console.log(err));
    //console.log(req.body);
    //console.log(event_id);
    //console.log(date_time);
    //const queryParams1 = [event_id, date_time];
    //return db
      //.query(queryString1, queryParams1)
      //.then((resdb) => {
        // const event_id = resdb.rows[0].event_id;
        //return db
          //.catch((err) => console.log(err));
      //})

    });

    // NEED TO WORK ON THIS PART
    router.post("/event", (req, res) => {
      console.log(req.body);
      const event_id = req.body.eventID;
      const name = req.body.name;
      const email = req.body.email;
      // Figure out how to grab checkboxes as timeslot id
      // We figure out how to grab the timeslots choices into an array
      const timeslots = req.body.timeslots;
      console.log(timeslots[0]);

      // CHALLENGING SECTION
      // Write two queries to insert into two different tables.
      const queryParams1 = [name, email];
      let queryString1 = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`;
      let queryString2 = 'INSERT INTO votes (user_id, time_id) VALUES ($1, $2) RETURNING *';

      return db
      .query(queryString1, queryParams1)
      .then((resdb) => {
        console.log(resdb.rows[0].id);
        const user_id = resdb.rows[0].id;
        const time_id = req.body["timeslots"];

        // Need to loop through the array of timeslots and insert into the timeslots database table
        const promises = [];
        for (let element of timeslots) {
          console.log(element);
          const promise = db.query(queryString2, [user_id, element]);
          promises.push(promise);
        }
        Promise.all(promises).then(function() {
          // res.redirect(`/event/${event_id}`);
          res.send(`<script>alert("Successfully added!"); window.location.href = "/event/${event_id}"; </script>`);
        }).catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    });

  return router;
};
