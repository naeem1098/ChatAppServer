const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MPCforBlender@2476',
    database: 'sakila'
})


module.exports = {connection};