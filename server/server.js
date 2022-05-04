const express = require("express");
const Sequelize = require("sequelize");
const app = express();
const cors = require("cors");
require("dotenv").config();

const path = require("path");

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

//we use this to host the main page on our baseURL
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
//


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

app.post('/users', (req, res) => {
  // console.log(req.body);
  const {first_name, last_name,username, email, password} = req.body;
  sequelize.query(`
    INSERT INTO users (first_name, last_name, username, email, password)
    VALUES('${first_name}', '${last_name}', '${username}', '${email}', '${password}')
  `)
})


const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, function (req, res) {
  console.log(`listening on port ${SERVER_PORT}`);
});
