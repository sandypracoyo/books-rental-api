exports.DONT_HAVE_PERMISSION = {
    status: 401,
    success: false,
    message: 'You dont have permission !'
}

exports.SUCCESS_RETRIEVE_DATA = {
    status: 200,
    success: true,
    message: 'Success retrieve data'
}

exports.SUCCESS = (data) => {
    return {
        status: 200,
        success: true,
        message: data ? data : 'Success'
    }
}

exports.INCORRECT_FIELD = (data) => {
    return {
        status: 401,
        success: false,
        message: `${data} is incorrect !`
    }
}

exports.FALSE_DATA = (data) => {
    return {
        status: 401,
        success: false,
        message: `${data} is false !`
    }
}

exports.NOT_FOUND = (data) => {
    return {
        status: 404,
        success: false,
        message: `${data} not found !`
    }
}

exports.INVALID_TOKEN = {
    status: 404,
    success: false,
    message: 'Invalid token !'
}

exports.TOKEN_EXPIRED = {
    status: 401,
    success: false,
    message: 'Token is expired !'
}

exports.DATA_CANNOT_BLANK = (data) => {
    return {
        status: 401,
        success: false,
        message: `${data} cannot blank !`
    }
}

exports.INTERNAL_SERVER_ERROR = {
    status: 500,
    success: false,
    message: 'Internal server error !'
}