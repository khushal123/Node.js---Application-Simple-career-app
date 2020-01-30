let models = require("../models");
let companies = models.companies;
let insert = async (body) => {
    try {
        let company = await companies.create(body)
        return company;
    } catch (error) {
        return Promise.reject({
            message: error.original.sql,
            stack: "companies/12"
        });
    }

}

let getList = async () => {
    try {
        console.log("getting ocmpanies");
        let company = await companies.findAll({
            order: [
                ['id', 'DESC']
            ],
        })
        return company;
    } catch (error) {
        console.log(error);
        return Promise.reject({
            message: error.original.sql,
            stack: "companies/30"
        });
    }
}

let getById = async (id) => {
    try {
        let company = await companies.findOne({
            where: {
                id: [id]
            }
        })
        return company;
    } catch (error) {
        console.log(error);
        return Promise.reject({
            message: error.original.sql,
            stack: "companies/46"
        });
    }
}

let getJobs = async (company_id) => {
    try {
        let company = await companies.findOne({
            where: {
                'id': company_id
            },
            include: [
                { model: models.jobs, as: "jobs" }
            ]
        })
        return company;
    } catch (error) {
        console.log(error);
        return Promise.reject({
            message: error.original.sql,
            stack: "jobs/65"
        });
    }
}


module.exports = {
    insert,
    getById,
    getList,
    getJobs
}