var express = require('express');
var router = express.Router();
let { validateToken } = require("../utils/token");
let { create, list, getCompany, getJobList } = require("../controllers/companies");

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

router.get("/", checkToken, list);
router.post("/",checkToken, create);
router.get("/single/:id", checkToken, getCompany);
router.get("/:id/jobs", checkToken, getJobList)

module.exports = router;
