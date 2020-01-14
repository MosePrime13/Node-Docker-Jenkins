export function errorResponses(status, description, error){
    return {
        status: status,
        description: description,
        error: error
    }
}

export function successResponses(status, description, data){
    return {
        status: status,
        description: description,
        data: data
    }
}

