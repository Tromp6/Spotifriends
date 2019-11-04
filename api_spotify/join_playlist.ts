export{};
const request = require('request'); 

module.exports = function joinPlaylist(accessToken: String, playlistID: any) {
  return new Promise((resolve) =>{
    const options = {
      url: 'https://api.spotify.com/v1/playlists/'+playlistID+'/followers',        
      headers: { 'Authorization': 'Bearer ' + accessToken, 
      'Content-Type': 'application/json' },
      form: JSON.stringify({
        'public': false,
      }),
      json: true
    
    };  

    request.post(options, function(error: any, response: any, body: any) {
        console.log(body);
        resolve(body);

    });
  })  
  
 

}

