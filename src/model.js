const db = require("../database/connection");

function createUser(data) {
  const values = [data.username, data.age, data, dogname, data.location];
  return db.query(
    "INSERT INTO users(username, age, location) VALUES()",
    values
  );
}

module.exports = { createUser };
