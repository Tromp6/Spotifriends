export{};
const request = require('request'); 

module.exports.getTracks = (accessToken: String) => {
    return new Promise((resolve: any, reject: any) => {  
        const options = {
            url: 'https://api.spotify.com/v1/me/top/tracks',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            json: true,
            qs: {"time_range": "short_term", "limit": 10}
        };

        request.get(options, function(error: any, response: any, body: any) {
            const trackUriArray: any = [];
            for(let i = 0; i < body.items.length; i++){
                trackUriArray.push(body.items[i].uri);
            }
            resolve(trackUriArray);

            
        });
    })
}