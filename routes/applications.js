var express = require('express');
var router = express.Router();
var { validateToken } = require("../utils/token");
let { createApplication, getListBySeeker, getApplication, updateApplication, getListByCompnayId } = require("./../controllers/applications");
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



router.get("/seeker/:id", checkToken, getListBySeeker);

router.post("/seeker/:id", checkToken, createApplication);

router.get("/company/:id", checkToken, getListByCompnayId);

router.get("/:id", checkToken, getApplication);

router.put("/:id", checkToken, updateApplication);


// router.put("/");



module.exports = router;
