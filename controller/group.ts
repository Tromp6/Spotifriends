const groupModel = require("../model/group");
const createGroupInDB = require("../queries/queries");
const getAccessAndRefreshToken = require("../api_spotify/get_Tokens");

exports.createGroup = (groupName: String, invitationLink: String, spotifyRef: String ) => {
    const groupInstance = new groupModel(groupName, invitationLink, spotifyRef);
    groupInstance.save();

}

exports.getGroups = () => {
   return groupModel.getGroupsFromDB();
}

exports.getAccessAndRefreshToken = (scope: String, code: String, endpoint: String) => {
  getAccessAndRefreshToken(scope, code, endpoint)
}

