var express = require("express");
var cors = require('cors');

var app = express();

// use it before all route definitions
app.use(cors({origin: 'https://localhost:7174'}));
