

const groupModel = require("../model/group");
const createGroupInDB = require("../queries/queries");


exports.createGroup = async(groupName: String, userID: String) => {
    const invitationLink = "dummy";
    const option = "dummy";
    const admin = "dummy";
    const groupInstance = new groupModel.createInstance(groupName, invitationLink, option, admin);
     
    await groupModel.createGroup(userID, groupInstance);

}

exports.getGroups = (userID: any) => {
  return groupModel.getGroupsFromDB(userID);

}


