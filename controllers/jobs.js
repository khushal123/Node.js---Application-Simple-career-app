let { jobsCreateValidation } = require("../utils/validations");
let { validationErrorResponse, successResponse } = require("../utils/response");

let { insert, getById, getList } = require("../db/jobsQuery");



let create = async (req, res, next) => {
    console.log(req.userData.user.userType);
    if (req.userData.user.userType !== 'employer') {
        return validationErrorResponse(res, "you dont have permission to create")
    }
    let body = req.body;
    let validationResult = jobsCreateValidation(body)
    if (validationResult.error) {
        validationErrorResponse(res, validationResult.error.details);
        return;
    }
    try {
        body.posted_by = req.userData.user.id;
        console.log(body);
        let job = await insert(body);
        return successResponse(res, job);
    } catch (error) {
        return validationErrorResponse(res, error)
    }

}

let list = async (req, res, next) => {
    try {
        let company = await getList();
        return successResponse(res, company);
    } catch (error) {
        return validationErrorResponse(res, error)
    }
}

let getJob = async (req, res, next) => {
    try {
        let id = req.params.id;
        let job = await getById(id);
        return successResponse(res, job);
    } catch (error) {
        return validationErrorResponse(res, error)
    }

}

module.exports = { create, list, getJob }