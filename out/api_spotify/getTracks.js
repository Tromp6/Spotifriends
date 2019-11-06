"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
module.exports.getTracks = function (accessToken) {
    return new Promise(function (resolve, reject) {
        var options = {
            url: 'https://api.spotify.com/v1/me/top/tracks',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            json: true,
            qs: { "time_range": "short_term", "limit": 10 }
        };
        request.get(options, function (error, response, body) {
            var trackUriArray = [];
            for (var i = 0; i < body.items.length; i++) {
                trackUriArray.push(body.items[i].uri);
            }
            console.log(trackUriArray);
            resolve(trackUriArray);
        });
    });
};
//# sourceMappingURL=getTracks.js.map