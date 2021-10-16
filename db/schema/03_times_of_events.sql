DROP TABLE IF EXISTS times CASCADE;

CREATE TABLE timeslots (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL
);
