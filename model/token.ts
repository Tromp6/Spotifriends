const getTokens = require('../api_spotify/get_Tokens');
const queries = require("../queries/queries");

module.exports.getAndStoreAccessRefreshTokens = (code: String, userID: any) => {
    getTokens(code, userID, queries.saveTokensToDB);
};

