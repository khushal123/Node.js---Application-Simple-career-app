let { validationErrorResponse, successResponse } = require("../utils/response");

let { insert, getById, getForSeeker, update, getForCompany } = require("../db/applicationsQuery");



let createApplication = async (req, res, next) => {
    console.log(req.userData.user.userType);
    if (req.userData.user.userType !== 'seeker') {
        return validationErrorResponse(res, "you dont have permission to create")
    }
    let body = req.body;
    if (!body.job_id) {
        return validationErrorResponse(res, "Job id is required")
    }
    try {
        let candidate_id = req.params.id;

        let application = await insert(body.job_id, candidate_id);
        return successResponse(res, application);
    } catch (error) {
        return validationErrorResponse(res, error)
    }

}

let getListBySeeker = async (req, res, next) => {
    try {
        let candidate_id = req.params.id;
        let applications = await getForSeeker(candidate_id);
        return successResponse(res, applications);
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res, error)
    }
}


let getListByCompnayId = async (req, res, next) => {
    try {
        console.log("getting ocmpanies 1");
        let id = req.params.id;
        let company = await getForCompany(id);

        return successResponse(res, company);
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res, error)
    }
}


let getApplication = async (req, res, next) => {
    try {
        let id = req.params.id;
        console.log(id);
        let company = await getById(id);
        return successResponse(res, company);
    } catch (error) {
        return validationErrorResponse(res, error)
    }
}

let updateApplication = async (req, res, next) => {
    try {
        let id = req.params.id;
        let status = req.body.status;
        if(!status){
            return validationErrorResponse(res, "Status is required")
        }
        console.log(id);
        let company = await update(id, status);
        return successResponse(res, company);
    } catch (error) {
        return validationErrorResponse(res, error)
    }
}

module.exports = { createApplication, getListBySeeker, getApplication, updateApplication, getListByCompnayId }