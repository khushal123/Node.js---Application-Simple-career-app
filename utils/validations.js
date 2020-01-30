let Joi = require("@hapi/joi");
let constants = require('./constants');
let registrationValidation = (req, body) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().required(),
        userType: Joi.string().valid(constants.userTypes.seeker, constants.userTypes.employer).required(),
        mobile: Joi.number().integer().min(1000000000).max(9999999999)
    });
    const { error, value } = schema.validate({
        name: body.name,
        email: body.email,
        mobile: body.mobile,
        password: body.password,
        userType: body.userType
    });
    return { error, value };
}

let loginValidationEmail = (req, body) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required(),
    });
    const { error, value } = schema.validate({
        email: body.email,
        password: body.password
    });
    return { error, value };
}


let companyCreateValidation = (body) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        count: Joi.number(),
        industry: Joi.string().required(),
        descript: Joi.string().required()
    });
    const { error, value } = schema.validate(body);
    return { error, value };
}

let jobsCreateValidation = (body) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        company_id: Joi.string().required()
    });
    const { error, value } = schema.validate(body);
    return { error, value };
}



module.exports = {
    registrationValidation,
    loginValidationEmail,
    companyCreateValidation,
    jobsCreateValidation
}
