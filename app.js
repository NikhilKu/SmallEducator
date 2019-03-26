require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const db = require("./models");
const apiCourse = require('./api/course');
const apiTeachers = require('./api/teachers');
const apiStudents = require('./api/students');
const apiKeys = require('./api/enrollmentkey');
const apiClassroom = require('./api/classroom');


//Setup ExpressJS
const index = express();
index.use(bodyParser.json());
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());

//Make it posible to a client-side server to get data from the api.
index.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//All the api routes to run
var apiRoutes = [apiCourse, apiTeachers, apiStudents, apiKeys, apiClassroom];

apiRoutes.forEach((route) =>
    route(index, db),
);
db.sequelize.sync().then(()=>{
    //db is synced
});

module.exports = index;
