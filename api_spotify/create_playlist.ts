export{};
const request = require('request'); 

module.exports = function createPlaylistInSpotify(accessToken: String, playlistName: String, userID: any) {
  return new Promise((resolve) =>{
    const options = {
      url: 'https://api.spotify.com/v1/users/'+userID+'/playlists',        
      headers: { 'Authorization': 'Bearer ' + accessToken, 
      'Content-Type': 'application/json' },
      form: JSON.stringify({
        'name': playlistName,
        "description": "Created by Spotifriends",
        'public': false,
        'collaborative': true
      }),
      json: true
    
    };  

    request.post(options, function(error: any, response: any, body: any) {
      console.log(error);
     resolve(body.id);
    });
  })  
  
 

}

