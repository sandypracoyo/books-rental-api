exports.IS_EMPTY = (data) => {
    return `${data} is empty`
}

exports.IS_FALSE = (data) => {
    return `${data} is false`
}

exports.IS_EXIST = (data) => {
    return `${data} already exist`
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

exports.DONT_HAVE_PERMISSION = {
    status: 401,
    success: false,
    message: 'You dont have permission !'
}



exports.INCORRECT_FIELD = (data) => {
    return {
        status: 401,
        success: false,
        message: `${data} is incorrect !`
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


exports.INTERNAL_SERVER_ERROR = {
    status: 500,
    success: false,
    message: 'Internal server error !'
}