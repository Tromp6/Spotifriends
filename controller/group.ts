const groupModel = require("../model/group");
const createGroupInDB = require("../queries/queries");
const getAccessAndRefreshToken = require("../api_spotify/get_Tokens");

exports.createGroup = (groupName: String, userID: String) => {
    const invitationLink = "dummy";
    const spotifyRef = "dummy";
    const option = "dummy";
    const admin = "dummy";
    const groupInstance = new groupModel.createInstance(groupName, spotifyRef, invitationLink, option, admin);
    groupInstance.save(userID);

}

exports.getGroups = (userID: any) => {
  return groupModel.getGroupsFromDB(userID);

}

exports.getAccessAndRefreshToken = (scope: String, code: String, endpoint: String) => {
  getAccessAndRefreshToken(scope, code, endpoint)
}

