var express = require('express');
var router = express.Router();
let { login, register } = require("../controllers/users")
//login
router.post('/login', login);

//register
router.post('/register', register);

module.exports = router;
