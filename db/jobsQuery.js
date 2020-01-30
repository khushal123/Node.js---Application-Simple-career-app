let models = require("../models");
let jobs = models.jobs;


let insert = async (body) => {
    try {
        console.log(body);
        let job = await jobs.create(body)
        return job;
    } catch (error) {
        return Promise.reject({
            message: error.original.sql,
            stack: "jobs/13"
        });
    }

}

let getList = async () => {
    try {
        let jobList = await jobs.findAll({
            order: [
                ['id', 'DESC']
            ],
            include: [
                { model: models.companies, as: "company", attributes:['id', 'name', 'count', 'industry'] },
                { model: models.users, as: "user", attributes:['id', 'email', 'userType', 'name', 'mobile'] }
            ]
        })
        return jobList;
    } catch (error) {
        console.error(error);
        return Promise.reject({
            message: error.original.sql,
            stack: "jobs/29"
        });
    }
}

let getById = async (id) => {
    try {
        console.log(id);
        let job = await jobs.findOne({
            where: {
                id: id
            },
            include: [
                { model: models.companies, as: "company", attributes:['id', 'name', 'count', 'industry'] },
                { model: models.users, as: "user", attributes:['id', 'email', 'userType', 'name', 'mobile'] }
            ]
        })
        return job;
    } catch (error) {
        return Promise.reject({
            message: error.original.sql,
            stack: "jobs/45"
        });
    }
}






module.exports = {
    insert,
    getById,
    getList
}