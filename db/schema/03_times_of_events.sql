DROP TABLE IF EXISTS timeslots CASCADE;

CREATE TABLE timeslots (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  date_time TEXT NOT NULL
);
