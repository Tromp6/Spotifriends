export{};

const userModel = require('../model/user');
const queries = require('../queries/queries');

module.exports.controller = async(code: String, req: any) => {
    await userModel.createOrUpdateUser(code, req);
};