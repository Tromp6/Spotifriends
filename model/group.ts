export{};
const queries = require("../queries/queries");
const spotifyApi = require("../api_spotify/create_playlist")


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
    spotifyRef: String;
    option: String;
    admin: String;

     
    constructor(groupName: String, invitationLink: String, spotifyRef: String, option: String, admin: String){
        this.groupName = groupName;
        this.invitationLink = invitationLink;
        this.spotifyRef = spotifyRef;
        this.option = option;
        this.admin = admin;
 
     }

    save(userID: any) {
        queries.createGroup(this, userID);
        }
}

module.exports.getGroupsFromDB = (userID: any) => {
    return new Promise(async resolve => {
        const groups =  await queries.getGroups(userID);  
        resolve(groups)
    })
}