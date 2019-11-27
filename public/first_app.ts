export {};

const http = require('http');
const fs = require("fs");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const sessionStore = require('connect-pg-simple')(session);
const cors = require('cors');

 
const generellRoutes = require("../routes/routes");
const authRoutes = require("../routes/auth");
const {pool} = require("../protected/config");
require('dotenv').config();
const express = require("express");

const app = express();


/*
const store = new sessionStore({
    pool : pool,
    tableName : 'session'  
  });
*/
app.set('view engine', 'pug');
app.set('views','view' );

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));


app.use(session({
  store: new sessionStore({
    conString: process.env.DATABASE_URL || "postgres://localhost:5432/yourproject",
  }),
  key: 'user_sid',
  secret: "egalerstmal",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 10 * 6000000 },
}));




app.use(cookieParser());


app.use("/",generellRoutes);
app.use("/",authRoutes);




app.listen(3000);




//const server = http.createServer(route);
//server.listen(3000);

