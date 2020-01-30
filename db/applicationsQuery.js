let models = require("../models");
let applications = models.application;
let companies = models.companies;
let users = models.users;

let insert = async (job_id, candidate_id) => {
    try {
        let application = await applications.findOne({
            where: {
                candidate_id: candidate_id,
                job_id: job_id
            }
        });
        if (application) {
            return Promise.reject({
                message: "You have already applied",
                application: application
            });
        }
        application = await applications.create({
            job_id: job_id,
            candidate_id: candidate_id,
            "status": "APPLIED"
        })
        return application;
    } catch (error) {
        return Promise.reject({
            message: error.original.sql,
            stack: "application/25"
        });
    }

}


let getForSeeker = async (id) => {
    try {
        let application = await users.findAll({
            where: {
                'id': id
            },
            attributes: ['email', 'name', 'mobile'],
            include: [
                {
                    model: models.application,
                    include: {
                        model: models.jobs, as: "job",
                        include: {
                            model: models.companies, as: "company"
                        }
                    },
                }
            ],
            group: ['applications.job_id']
        })
        return application;
    } catch (error) {
        console.log(error);
        return Promise.reject({
            message: error,
            stack: "application/56"
        });
    }
}


let getById = async (id) => {
    try {
        let application = await applications.findOne({
            where: {
                id: id
            },
            include: [
                { model: models.jobs, as: "job" },
                { model: models.users, as: "user" }
            ]
        })
        return application;
    } catch (error) {
        return Promise.reject({
            message: error.original.sql,
            stack: "application/82"
        });
    }
}

let update = async (id, status) => {
    try {
        console.log(status);
        let application = await applications.update(
            {status:status},
            {
                where: {
                    id: id
                }
            })
        application = await applications.findOne({
            where:{
                id:id
            }
        });    
        return application;
    } catch (error) {
        return Promise.reject({
            message: error.original.sql,
            stack: "application/100"
        });
    }
}


let getForCompany = async (company_id) => {
    try {
        let companyJobList = await companies.findAll({
            where: {
                'id': company_id
            },
            include: [
                {
                    model: models.jobs, as: "jobs",
                    include: [{
                        model: models.users, as: "created_by", attributes: ['id', 'email', 'userType', 'name', 'mobile'],
                    },
                    {
                        model: models.application,
                        include: { model: models.users, as: "applicant", attributes: ['id', 'email', 'userType', 'name', 'mobile'] }
                    }]

                }
            ]
        })
        return companyJobList;
    } catch (error) {
        console.log(error);
        return Promise.reject({
            message: error,
            stack: "application/116"
        });
    }
}

module.exports = {
    insert,
    getForSeeker,
    getById,
    update,
    getForCompany
}
