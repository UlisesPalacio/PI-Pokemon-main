require('events').EventEmitter.prototype._maxListeners = 100;
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const getPokemons = require("./routes/getPokemons");
const postPokemons = require("./routes/postPokemons");
const getTypes = require("./routes/getTypes");

require("./db.js");

const server = express();

//const cors = require("cors");

server.name = "API";

//server.use(cors())
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/pokemons", getPokemons); //si la ruta dice /pokemons se va para getPokemons por eso no hace falta ahi pasarle /pokemons.
server.use("/post", postPokemons);
server.use("/types", getTypes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
