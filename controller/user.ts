export{};

const userModel = require('../model/user');
const queries = require('../queries/queries');

module.exports.controller = (code: String) => {
    userModel.createOrUpdateUser(code);
};