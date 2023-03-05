exports.errorMiddleware = (error, req, res, next) => {
    const errorStatus = error.status || 500
    const errorMessage = error.message
    const errorData = error.data
    console.log({
        errorStatus,
        errorMessage,
        errorData
    });

    res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        data: errorData
    })
}