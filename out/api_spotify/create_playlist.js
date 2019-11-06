"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
module.exports = function createPlaylistInSpotify(accessToken, playlistName, userID) {
    return new Promise(function (resolve) {
        var options = {
            url: 'https://api.spotify.com/v1/users/' + userID + '/playlists',
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
        request.post(options, function (error, response, body) {
            console.log(error);
            resolve(body.id);
        });
    });
};
//# sourceMappingURL=create_playlist.js.map