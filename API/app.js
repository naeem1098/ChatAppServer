const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
// const jwt = require("jsonwebtoken");

const {verifyToken} = require("../Auth/authentication");
// const {connection} = require('../database/dbConnection');

const app = express.Router();


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get('/', verifyToken, (req, res) => {

})


module.exports = {app};
