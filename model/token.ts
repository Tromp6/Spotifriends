const getTokens = require('../api_spotify/get_Tokens');
const getProfile = require('../api_spotify/get_profile');
const queries = require("../queries/queries");



module.exports.getAndStoreAccessRefreshTokens = async(code: String) => {
  let accessToken, refreshToken, userName, email, userID;
 
  await getTokens(code).then((access_token: any,refresh_token: any) =>{accessToken = access_token; refreshToken = refresh_token});
  await getProfile.getProfile(accessToken).then((data: any) => {userName = data.userName; email = data.email; userID = data.id});
  
  
  console.log(queries.saveUserInformationToDB(userID, userName, email));
  
  
};


