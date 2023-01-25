const express = require('express');
const router = express.Router();

const {Client} = require("pg");

const dbClient = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

dbClient.connect(err => {
    if (err) {
        console.log('Failed to connect db ' + err)
    } else {
        console.log('Connect to db done!')
    }
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Connect to db done!');
});

module.exports = router;
