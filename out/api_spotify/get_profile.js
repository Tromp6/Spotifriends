"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
module.exports.getProfile = function (accessToken) {
    return new Promise(function (resolve, reject) {
        var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            json: true
        };
        request.get(options, function (error, response, body) {
            resolve({ userName: body.display_name, email: body.email, id: body.id });
        });
    });
};
//# sourceMappingURL=get_profile.js.map