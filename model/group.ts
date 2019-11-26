export{};
const queries = require("../queries/queries");
const createPlaylistInSpotify = require("../api_spotify/create_playlist")
const spotifyApiFollowPlaylist = require("../api_spotify/join_playlist");
const getTracksController = require("../controller/getTracks");
const getTracksApi = require("../api_spotify/getTracks");
const addTracksApi = require("../api_spotify/add_tracks")

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

module.exports.joinGroup = async(userID: any, spotifyID: any) => {
    const accessToken = await queries.getAccessToken(userID);
    spotifyApiFollowPlaylist(accessToken, spotifyID, userID);
    const groupName = await queries.getGroupNameFromDB(spotifyID);
    fillPlaylist(accessToken, spotifyID);
    await queries.joinGroup(userID, spotifyID);
}

module.exports.createGroup = async(userID: any, data: any) => {
    const accessToken = await queries.getAccessToken(userID);
    const spotifyID = await createGroupInSpotifyAndGetSpotifyID(accessToken, data.groupName, userID);
    
    data.spotifyID = spotifyID;
    fillPlaylist(accessToken, data.spotifyID);
    await queries.createGroupInDB(data, userID);
    getTracksController.getTracks(accessToken);

}


module.exports.getGroupsFromDB = (userID: any) => {
    return new Promise(async resolve => {
        const groups =  await queries.getGroups(userID);  
        resolve(groups)
    })
}

module.exports.isUserInGroup = async(playlistID: any, userID: any) => {
    const groupID = await queries.getSpecificGroupIDBySpotifyID(playlistID);
    await queries.isUserInGroup(groupID, userID);
}

const createGroupInSpotifyAndGetSpotifyID = async(accessToken: any, playlistName: any, userID: any) => {
    const spotifyID = await createPlaylistInSpotify(accessToken, playlistName, userID);
    return spotifyID;
};

async function fillPlaylist(accessToken: any, playlistID: any){
    const trackUriArray = await getTracksApi.getTracks(accessToken);
    addTracksApi.addTracksToPlaylist(accessToken, playlistID, trackUriArray);
}