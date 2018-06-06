const errorHandler = (errors) => {
    if (typeof errors === 'string') {
        return {
            errorMessage: errors
        }
    }

    let errorMsg = {}
    for (error in erros) {
        errorMsg[error] = errors[error].msg
    }

    return errorMsg
}

module.exports = errorHandler