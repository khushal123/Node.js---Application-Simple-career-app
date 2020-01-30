var express = require('express');
var router = express.Router();

let users = require("./users");
let applications = require("./applications");
let jobs = require("./jobs");
let companies = require("./companies");


/* GET home page. */
router.use('/users', users);
router.use("/applications", applications);
router.use("/jobs", jobs);
router.use("/companies", companies);

module.exports = router;
