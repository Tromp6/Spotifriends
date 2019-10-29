import { X_OK } from "constants";

const getTokens = require('../api_spotify/get_Tokens');
const getProfile = require('../api_spotify/get_profile');
const queries = require("../queries/queries");



module.exports.createOrUpdateUser = async(code: String) => {
  
  const {accessToken, refreshToken} = await getTokens(code);
  const {id, userName, email} = await getProfile.getProfile(accessToken);

  const user = new User(id, userName, email, accessToken, refreshToken);

    
    if(await queries.getUser() === null){
      queries.saveUserToDB(user);
    }else{
      queries.updateUserInDB(user);
    }
  
};

class User{
  userID: any;
  userName: String;
  email: String;
  accessToken: any;
  refreshToken: any;

  constructor(userID:  any, userName: String, email: String, accessToken: any, refreshToken: any){
    this.userID = userID;
    this.userName = userName;
    this.email = email;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

