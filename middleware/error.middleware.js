const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        error: {
            code: statusCode,
            message: err.message
        }
    })
}

module.exports = { errorHandler };