"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
module.exports = function joinPlaylist(accessToken, playlistID) {
    console.log(accessToken);
    console.log("häää");
    console.log(playlistID);
    return new Promise(function (resolve) {
        console.log("geht bis hier");
        var options = {
            url: 'https://api.spotify.com/v1/playlists/' + playlistID + '/followers',
            headers: { 'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json' },
            form: JSON.stringify({
                'public': false,
            }),
            json: true
        };
        request.put(options, function (error, response, body) {
            console.log(response);
            resolve(response);
        });
    });
};
//# sourceMappingURL=join_playlist.js.map