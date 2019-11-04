export{};

const groupModel = require('../model/group');

module.exports.joinGroup = async(playlistID: String, userID: String) => {
        const groupName = null;
        const invitationLink = "dummy";
        const option = "dummy";
        const admin = "dummy";
        const groupInstance = new groupModel.createInstance(groupName, invitationLink, option, admin);
        groupInstance.spotifyID = playlistID; 
        await groupModel.joinGroup(userID, groupInstance);
    }
