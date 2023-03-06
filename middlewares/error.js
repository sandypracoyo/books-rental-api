exports.errorMiddleware = (error, req, res, next) => {
    const errorStatus = error.statusCode || 500
    const errorMessage = errorStatus === 500 ? 'Internal server error' : error.message
    const errorData = error.data ? error.data : null

    if(errorStatus === 500) {
        console.log('Error : '+error);
    }

    res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        data: errorData === null ? {} : errorData
    })
}