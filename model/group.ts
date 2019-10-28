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


module.exports = class Group{
    groupName: String; 
    invitationLink: String;
    spotifyRef: String;

  

    save() {

        queries.createGroup(this);

      
        }
    

    static getGroupsFromDB(){
        return new Promise(async resolve => {
            const {rows} =  await queries.getGroups();
            resolve(rows)
        })
        
        
           
         
        };

    constructor(groupName: String, invitationLink: String, spotifyRef: String ){
       this.groupName = groupName;
       this.invitationLink = invitationLink;
       this.spotifyRef = spotifyRef;

    }

}