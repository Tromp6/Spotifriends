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
    const spotifyRef = await createGroupInSpotifyAndGetSpotifyRef(accessToken, data.groupName);
    
    data.spotifyRef = spotifyRef;
    console.log(data.spotifyRef);

    await queries.createGroupInDB(data, userID);
}


module.exports.getGroupsFromDB = (userID: any) => {
    return new Promise(async resolve => {
        const groups =  await queries.getGroups(userID);  
        resolve(groups)
    })
}

const createGroupInSpotifyAndGetSpotifyRef = async(accessToken: any, playlistName: any) => {
    const spotifyref = await createPlaylistInSpotify(accessToken, playlistName);
    return spotifyref;
};