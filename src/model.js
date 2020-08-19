const db = require("../database/connection");

function createUser(data) {
  const values = [
    data.username,
    data.age,
    data.password,
    data.dogname,
    data.location,
  ];
  return db.query(
    "INSERT INTO users(username, age, password, dogname, location) VALUES($1, $2, $3, $4, $5) RETURNING id",
    values
  );
}

function fetchDoggoDaily(id) {
  return db
    .query("Select * FROM dog_daily WHERE user_id = $1", [id])
    .then((results) => results.rows);
}

function insertDoggoDaily(data) {
  console.log(data);
  const values2 = [
    data.whenPeed,
    data.whenPooped,
    data.whenAte,
    data.whenWalk,
    data.otherInfo,
    data.user_id,
  ];
  console.log(values2);
  return db.query(
    "Insert Into dog_daily(pepi, poop, eat, walk, other, user_id) VALUES($1, $2, $3, $4, $5, $6)",
    values2
  );
}

function login(user) {
  return db
    .query("Select * FROM users WHERE username=$1 AND password=$2 ", [
      user.username,
      user.password,
    ])
    .then((result) => {
      if (result.rows.length === 0) {
        result.rows;
      } else {
        return result.rows[0];
      }
    });
}

module.exports = { createUser, fetchDoggoDaily, insertDoggoDaily, login };
