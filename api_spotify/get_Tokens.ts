
const request = require("request");

const redirect_uri = "http://localhost:3000/loggedIn";
const client_secret = "8a6e11782c8347ef91fafce646db34b8";
const client_id = "9fac1cc7c3864dfd925c0deb2e7b04eb";

module.exports = (code: String) => {

  return new Promise((resolve: any, reject: any) => {
  
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };


    request.post(authOptions, function(error: any, response: any, body: any) {
      if (!error && response.statusCode === 200) {       
        resolve({accessToken: body.access_token, refreshToken: body.refresh_token});     
      }

      /*
      else {
          res.redirect('/login' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }

      */

    })
    ;
  })
}