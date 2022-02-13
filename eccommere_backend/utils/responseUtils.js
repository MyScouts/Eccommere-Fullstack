
const successResponse = (res, statusCode, message, data) => {
    return res.status(200).json({
        status: statusCode,
        message: message,
        data: data
    })
}

const errorResponse = (res, statusCode, message) => {
    return res.status(400).json({
        status: statusCode,
        message: message,
    })
}

module.exports = {
    successResponse,
    errorResponse
}
