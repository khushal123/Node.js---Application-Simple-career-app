let validationErrorResponse = (res, data) => {
    res.json({
        status: 400,
        data: data
    });
}

let successResponse = (res, data) => {
    res.json({
        status: 200,
        data: data
    });
}

module.exports = {validationErrorResponse, successResponse};