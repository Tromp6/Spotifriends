const getTracksApi = require("../api_spotify/getTracks");




module.exports.getTracks = (accessToken: any)=>{
   getTracksApi.getTracks(accessToken);
}

