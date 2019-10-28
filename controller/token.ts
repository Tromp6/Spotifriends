const tokenModel = require('../controller/token');

module.exports = (code: String, userID: String) => {
    tokenModel.getAndStoreAccessRefreshTokens(code, userID)
};