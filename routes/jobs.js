var express = require('express');
var router = express.Router();
var { validateToken } = require("../utils/token");
let { getJob, create, list } = require("./../controllers/jobs")
let checkToken = (req, res, next) => {
    var token = req.headers["authorization"];
    if (!token) {
        res.json({
            status: 400,
            message: "Invalid token",
            description: "token must be provided"
        })
    } else {
        validateToken(token).then((userData) => {
            req.userData = userData;
            console.log(userData);
            next();
        }).catch((error) => {
            res.json({
                status: 400,
                message: "Invalid token",
                description: error
            })
        })
    }
}



router.get("/", checkToken, list);
router.post("/", checkToken, create);
router.get("/single/:id", getJob);


// router.put("/");



module.exports = router;
