export{};
const request = require('request'); 

module.exports.getProfile = (accessToken: String) => {
    return new Promise((resolve: any, reject: any) => {  
        const options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            json: true
        };

        request.get(options, function(error: any, response: any, body: any) {
            
            resolve({userName: body.display_name, email: body.email,id: body.id});

            
        });
    })
}