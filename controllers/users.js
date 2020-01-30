let { registrationValidation, loginValidationEmail } = require("../utils/validations");
let { validationErrorResponse, successResponse } = require("../utils/response");
let { generateToken } = require("../utils/token");
// let { userTypes } = require("../utils/constants");
let { generateHash, compareHash } = require("../utils/bcrypt");

let { loginEmail, create } = require("../db/userQuery");



var register = (req, res, next) => {
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let mobile = req.body.mobile;
    let userType = req.body.userType;
    console.log(req.body.mobile.length);
    let validationResult = registrationValidation(req, {
        email: email,
        name: name,
        password: password,
        mobile: mobile,
        userType: userType
    })

    if (validationResult.error) {
        validationErrorResponse(res, validationResult.error.details);
        return;
    }
    generateHash(password).then((hash) => {
        return create(name, email, hash, mobile, userType);
    }).then((result) => {
       
        successResponse(res, {
            id:result.id,
            name: result.name,
            mobile:result.mobile,
            userType:result.userType
        });
    }).catch((error) => {
        console.log(error);
        validationErrorResponse(res, error);
    })

}

var login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let validationResult = loginValidationEmail(req, {
        email: email,
        password: password,
    })

    if (validationResult.error) {
        validationErrorResponse(res, validationResult.error.details);
        return;
    }
    var user = {}
    loginEmail(email).then((result) => {
        user = result;
        return compareHash(password, user.password)
    }).then((hash) => {
        return generateToken(user);
    }).then((token) => {
        console.log(token);
        let data = {
            id:user.id,
            userType:user.userType,
            name:user.name,
            mobile:user.mobile,
            token:token
        };
      
        successResponse(res, data);
    }).catch((error) => {
        console.log(error);
        validationErrorResponse(res, error);
    });

}



module.exports = { register, login }