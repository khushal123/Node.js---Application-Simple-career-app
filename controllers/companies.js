let { companyCreateValidation } = require("../utils/validations");
let { validationErrorResponse, successResponse } = require("../utils/response");

let { insert, getById, getList, getJobs } = require("../db/companyQuery");



let create = async (req, res, next) => {
    console.log(req.userData.user.userType);
    if(req.userData.user.userType !== 'employer'){
        return validationErrorResponse(res, "you dont have permission to create")
    }
    let body = req.body;
    let validationResult = companyCreateValidation(body);
    if (validationResult.error) {
        validationErrorResponse(res, validationResult.error.details);
        return;
    }
    try {
        let company = await insert(body);
        return successResponse(res, company);
    } catch (error) {
        return validationErrorResponse(res, error)
    }

}

let list = async (req, res, next) => {
    try {
        console.log("getting ocmpanies 1");
        let company = await getList();
        console.log(company);
        return successResponse(res, company);
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res, error)
    }
}

let getCompany = async (req, res, next) => {
    try {
        let id = req.params.id;
        let company = await getById(id);
        return successResponse(res, company);
    } catch (error) {
        return validationErrorResponse(res, error)
    }
}

let getJobList = async (req, res, next) => {
    try {
        let id = req.params.id;
        console.log(id);
        let company = await getJobs(id);
        return successResponse(res, company);
    } catch (error) {
        return validationErrorResponse(res, error)
    }
}

module.exports = { create, list, getCompany, getJobList }