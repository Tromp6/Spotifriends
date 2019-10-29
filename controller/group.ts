const groupModel = require("../model/group");
const createGroupInDB = require("../queries/queries");
const getAccessAndRefreshToken = require("../api_spotify/get_Tokens");

exports.createGroup = (groupName: String) => {
    const invitationLink = "dummy";
    const spotifyRef = "dummy";
    const option = "dummy";
    const admin = "dummy";
    const groupInstance = new groupModel.createInstance(groupName, spotifyRef, invitationLink, option, admin);
    groupInstance.save();

}

exports.getGroups = () => {
   return groupModel.getGroupsFromDB();
}

exports.getAccessAndRefreshToken = (scope: String, code: String, endpoint: String) => {
  getAccessAndRefreshToken(scope, code, endpoint)
}

