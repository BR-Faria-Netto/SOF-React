// open config
require("dotenv").config();
// conect base data
const db = require("./configdb/db");
db.connect();
// fill servoces in server
const services = require("./services/index");
// config ports 
const API_PORT = process.env.API_PORT;
const API_URL = process.env.API_URL;
const APP = services;
// up server in memory
APP.listen(API_PORT, () => console.log(`Listening on Host ${API_URL} port ${API_PORT}`));
