export {};

const http = require('http');
const fs = require("fs");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require('cookie-parser');


const generellRoutes = require("../routes/routes");
const authRoutes = require("../routes/auth");




const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.set('views','view' );

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'my secret', resave: false, saveUninitialized: false
}));
app.use(cookieParser());


app.use("/",generellRoutes);
app.use("/",authRoutes);





app.listen(3000);




//const server = http.createServer(route);
//server.listen(3000);

