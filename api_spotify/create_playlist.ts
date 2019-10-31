export{};
const request = require('request'); 

module.exports = function createPlaylistInSpotify(accessToken: String, playlistName: String) {
  return new Promise((resolve) =>{
    const options = {
      url: 'https://api.spotify.com/v1/users/1143005650/playlists',        
      headers: { 'Authorization': 'Bearer ' + accessToken, 
      'Content-Type': 'application/json' },
      form: JSON.stringify({
        'name': playlistName,
        "description": "Created by Spotifriends",
        'public': true
      }),
      json: true
    
    };  

    request.post(options, function(error: any, response: any, body: any) {
     resolve(body.href);
    });
  })  
  
 

}

