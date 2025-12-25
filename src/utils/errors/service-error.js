const { StatusCodes} = require('http-status-codes')

class ServiceError extends Error{
    constructor(
        message = 'Something went wrong',
         explanation='Service layer error'
         , statusCodes= StatusCodes.INTERNAL_SERVER_ERROR){

            super();
                    this.name = 'ServiceError',
        this.message=this.message,
        this.explanation=this.explanation,
        this.statusCodes=this.statusCodes

    }
    
}

module.exports = ServiceError;