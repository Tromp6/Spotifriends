const pool = require("../protected/pool_config");
const async = require("async_hooks");


module.exports.createGroup = (groupInstance: any) =>{
   const {groupName, spotifyRef, invitationlink } = groupInstance;
    pool.query('INSERT INTO groups(groupname, spotifyref, invitationlink) VALUES ($1, $2, $3)',[groupName,spotifyRef,invitationlink],(error: any, result: any)=>{
        if(error) {
            throw error;
        }
       
    });
}

module.exports.getGroups = () => {
    return new Promise(resolve => {
    
      pool.query("SELECT * FROM groups;", (err: any, result: any)=>{
          resolve(result);
      })
    })
}

module.exports.storePlaylistInformation = (spotifyRef: String) => {
    pool.query('INSERT INTO groups(spotifyref) VALUES ($1)',[spotifyRef],(error: any, result: any)=>{
        if(error) {
            throw error;
        }
        console.log("success");
    });
}

module.exports.saveTokensToDB = (accessToken: String, refreshToken: any, userID: any) =>{
     pool.query('INSERT INTO users(access_token_create, refresh_token_create) VALUES ($1, $2) WHERE id = $3',[accessToken, refreshToken, userID],(error: any, result: any)=>{
        if(error) {
            throw error;
        }
       
    });
}

module.exports.saveUserInformationToDB = (userID: String, userName: String, email: String) =>{
    pool.query('INSERT INTO users(id, name, email) VALUES ($1, $2, $3)',[userID, userName, email], (error: any, result: any)=>{
        if(error) {
            throw error;
        }
    })
}

module.exports.getAccount