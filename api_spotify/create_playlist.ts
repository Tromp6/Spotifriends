export{};
const queries = require("../queries/queries");
const request = require('request'); 

module.exports = function createPlaylistAndSaveToDB(access_token: String, playlistName: String) {
    const options = {
        url: 'https://api.spotify.com/v1/users/1143005650/playlists',        
        headers: { 'Authorization': 'Bearer ' + access_token, 
        'Content-Type': 'application/json' },
        form: JSON.stringify({
          'name': 'jaaa',
          "description": "New playlist description",
          'public': false
        }),
        json: true
      
      };  

      request.post(options, function(error: any, response: any, body: any) {
       
        queries.storePlaylistInformation(body.href)
      });

}

