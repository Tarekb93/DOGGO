BEGIN;

DROP TABLE IF EXISTS users, dog_daily CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  age INTEGER,
  password VARCHAR(255),
  -- confirmPassword VARCHAR(255),
  dogname VARCHAR(255) VARCHAR(255) NOT NULL,
  location VARCHAR(255)
);

CREATE TABLE dog_daily(
    user_id INTEGER references users(id),
    pepi text,
    poop text,
    eat text,
    walk text,
    other text
);

INSERT INTO users (username, age, password, dogname, location) VALUES
  ('BellaB', 7, 'psB','Bella', 'Sakhnin'), ('Kim', 12, 'psK','Kim','Haifa'),('Nala', 36, 'psN','Nala','Haifa');

INSERT INTO dog_daily(pepi, poop, eat, walk, other, user_id) VALUES ('pepi at 1200','poop at 1200', 'ate launch - rice & chicken at 1100', 'played till 1400','buy new food', 1);


COMMIT;