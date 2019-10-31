export{};

const express = require("express");
const querystring = require('querystring');
const request = require('request'); 
const generateRandomString = require('../helper/generateRandomString');
const userController = require('../controller/user');
const session = require('express-session');


const router = express.Router();

const stateKey = 'spotify_auth_state';
const redirect_uri = "http://localhost:3000/loggedIn";
const client_secret = "8a6e11782c8347ef91fafce646db34b8";
const client_id = "9fac1cc7c3864dfd925c0deb2e7b04eb";




router.get("/login",(req: any, res: any) => {
    
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    const scope = 'user-read-email playlist-modify-public';

    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});  

router.get("/loggedIn",async(req:any, res: any) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  
  if (state === null || state !== storedState) {
    res.redirect('/login' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {

    res.clearCookie(stateKey);
    req.session.isLoggedIn = true;
    await userController.controller(code, req);
    
    


        res.redirect('/');
      } 
    });
 
  


router.use((req: any, res: any, next: any) => {
  

    res.status(404).send('<h1>Page not found</h1>')
})
module.exports = router;