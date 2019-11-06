export{};

const groupModel = require('../model/group');

module.exports.joinGroup = async(playlistID: String, userID: String) => {
        
        if(await groupModel.isUserInGroup(playlistID, userID)){
            return null;
        }else{
            console.log(await groupModel.isUserInGroup(playlistID, userID));
            await groupModel.joinGroup(userID, playlistID);
        };

        
    }
