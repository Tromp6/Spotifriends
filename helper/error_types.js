module.exports.accessTokenExpired = ()=>{
    accessTokenExpiredError.prototype = new Error();
    return new accessTokenExpiredError();
}

function accessTokenExpiredError(message){
    this.message = message;
};
