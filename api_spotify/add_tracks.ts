export{};
const request = require('request'); 

module.exports.addTracksToPlaylist = (accessToken: String, playlistID: String, trackUriArray: any) => {
  console.log(trackUriArray);
  return new Promise((resolve) =>{
    const options = {
      url: 'https://api.spotify.com/v1/playlists/'+playlistID+'/tracks',        
      headers: { 'Authorization': 'Bearer ' + accessToken, 
      'Content-Type': 'application/json' },
      form: JSON.stringify({
        'uris': trackUriArray,
      }),
      json: true
    
    };  

    request.post(options, function(error: any, response: any, body: any) {
      console.log(response);
     resolve(response);
    });
  })  
  
 

}

