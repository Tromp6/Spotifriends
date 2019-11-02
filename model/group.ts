export{};
const queries = require("../queries/queries");
const createPlaylistInSpotify = require("../api_spotify/create_playlist")


const path = require("path");
const fs = require("fs");
const pathHelper = require("../helper/path");

const groups: any = [];
const p = path.join(
    pathHelper,"data", "product.json"
);


module.exports.createInstance = class Group{
    groupName: String; 
    invitationLink: String;
    option: String;
    admin: String;

     
    constructor(groupName: String, invitationLink: String, option: String, admin: String){
        this.groupName = groupName;
        this.invitationLink = invitationLink;
        this.option = option;
        this.admin = admin;
 
     }

    
}

module.exports.createGroup = async(userID: any, data: any) => {
    const accessToken = await queries.getAccessToken(userID);
    const spotifyID = await createGroupInSpotifyAndGetSpotifyID(accessToken, data.groupName, userID);
    
    data.spotifyID = spotifyID;
    await queries.createGroupInDB(data, userID);
}


module.exports.getGroupsFromDB = (userID: any) => {
    return new Promise(async resolve => {
        const groups =  await queries.getGroups(userID);  
        resolve(groups)
    })
}

const createGroupInSpotifyAndGetSpotifyID = async(accessToken: any, playlistName: any, userID: any) => {
    const spotifyID = await createPlaylistInSpotify(accessToken, playlistName, userID);
    return spotifyID;
};