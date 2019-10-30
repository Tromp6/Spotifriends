const pool = require("../protected/pool_config");
const async = require("async_hooks");


    module.exports.createGroup = (groupInstance: any, userID: any) => {
        createGroupTable(groupInstance).then((groupID: any) => {
            createGroupUserTable(groupID, userID);
        });
        
    };

    function createGroupTable(groupInstance: any) {
        const {groupName, spotifyRef, option, invitationLink, admin} = groupInstance;

        return new Promise((resolve: any, reject: any) => {
            pool.query('INSERT INTO groups(group_name, spotify_ref, option, invitation_link, admin) VALUES ($1, $2, $3, $4, $5) RETURNING id',[groupName, spotifyRef, option, invitationLink, admin],(error: any, result: any)=>{
                if(error) {
                    reject(error);
                }else{
                    resolve(result.rows[0].id);
                }    
        })
        })
           
    }

    function createGroupUserTable(groupID: String, userID: String) {
        pool.query('INSERT INTO groups_users(user_id, group_id) VALUES ($1, $2)',[userID, groupID],(error: any, result: any)=>{
            if(error) {
                throw error;
            }
        
        });  
    };

module.exports.getGroups = (userID: any) => {
    const groups:any = [];
    return new Promise(resolve => {
      pool.query("SELECT * FROM groups_users WHERE user_id = $1;", [userID], async(err: any, result: any)=>{
      

        for(let i = 0; i < result.rows.length; i++){
            groups.push(await getSpecificGroup(result.rows[i].group_id));
        }
           
          resolve(groups);
      })
    })
}

function getSpecificGroup(group_id: any) {
    return new Promise((resolve) => {
       pool.query("SELECT * FROM groups WHERE id = $1;", [group_id], (err: any, result: any)=>{  
        resolve(result.rows[0]);      
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
     pool.query('INSERT INTO users(access_token, refresh_token) VALUES ($1, $2) WHERE id = $3',[accessToken, refreshToken, userID],(error: any, result: any)=>{
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

module.exports.saveUserToDB = (user: any) =>{
    pool.query('INSERT INTO users(id, name, email, access_token, refresh_token) VALUES ($1, $2, $3, $4, $5)',[user.userID, user.userName, user.email, user.accessToken, user.refreshToken], (error: any, result: any)=>{
        if(error) {
            throw error;
        }
    })
};

module.exports.updateUserInDB = (user: any) =>{
    pool.query('UPDATE users SET name = $1, email = $2 , access_token = $3 , refresh_token = $4 WHERE id = $5',[user.userName, user.email, user.accessToken, user.refreshToken, user.userID], (error: any, result: any)=>{
        if(error) {
            throw error;
        }
    })
};

module.exports.getUser = (userID: any) =>{
    return new Promise(resolve => {
        const id = 1143005650;
        pool.query('SELECT * FROM users WHERE id = $1',[id], (error: any, result: any)=>{


            if(error) {
                throw error;
            }
            if(result.rowCount === 0){
                result = null;
            }
            resolve(result)
        
        })
    })
}