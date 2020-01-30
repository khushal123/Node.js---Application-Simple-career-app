let models = require("../models");
let users = models.users;
let Op = models.Sequelize.Op;

let create = async (name, email, hash, mobile, userType) => {
    try {
        console.log(typeof users);
        let getUser = await users.findAll({
            where: {
                [Op.or]: {
                    email: email,
                    mobile: mobile
                }
            }
        })

        if (getUser && getUser.length > 0) {
            return Promise.reject({
                message: "user exists"
            });
        }
        let createUser = await users.create({
            name: name,
            email: email,
            password: hash,
            mobile: mobile,
            status: 1,
            userType: userType
        }, {
            plane: true
        });
       
        return createUser;
    } catch (error) {
        console.log("----------error-----------");
        console.log(error);
        console.log("----------error-----------");
        return Promise.reject({
            message: error,
            stack: "database/user.js/39"
        });
    }

}

let loginEmail = async (email, password) => {
    try {
        let getUser = await users.findOne({
            where: {
                email: email
            },
         
        })

        if (getUser === null) {
            return Promise.reject({
                message: "No user found"
            });
        }
        return getUser;
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

module.exports = {
    loginEmail,
    create
}