const express = require("express");
const Sequelize = require("sequelize");
const app = express();
const cors = require("cors");
require("dotenv").config();

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  sequelize.query(`SELECT first_name, last_name, email 
                    FROM new_users`)
    .then((dbRes) => {
            res.send(dbRes);
  });
});
app.get("/countries", (req, res) => {
  sequelize.query(`SELECT name 
                    FROM countries`)
    .then((dbRes) => {
            res.send(dbRes);
  });
});

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, function (req, res) {
  console.log(`listening on port ${SERVER_PORT}`);
});