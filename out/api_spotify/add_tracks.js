"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
module.exports.addTracksToPlaylist = function (accessToken, playlistID, trackUriArray) {
    console.log(trackUriArray);
    return new Promise(function (resolve) {
        var options = {
            url: 'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks',
            headers: { 'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json' },
            form: JSON.stringify({
                'uris': trackUriArray,
            }),
            json: true
        };
        request.post(options, function (error, response, body) {
            console.log(response);
            resolve(response);
        });
    });
};
//# sourceMappingURL=add_tracks.js.map