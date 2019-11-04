export{};
const request = require('request'); 

module.exports = function joinPlaylist(accessToken: String, playlistID: any) {
  console.log(accessToken);
  console.log("häää");
  console.log(playlistID);
  return new Promise((resolve) =>{
    console.log("geht bis hier");
    const options = {
      url: 'https://api.spotify.com/v1/playlists/'+playlistID+'/followers',        
      headers: { 'Authorization': 'Bearer ' + accessToken, 
      'Content-Type': 'application/json' },
      form: JSON.stringify({
        'public': false,
      }),
      json: true
    };  

    request.put(options, function(error: any, response: any, body: any) {
       console.log(response);
        resolve(response);

    });
  })  
  
 

}

