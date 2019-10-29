const tokenModel = require('../model/token');

module.exports = (code: String) => {
    tokenModel.getAndStoreAccessRefreshTokens(code);
};