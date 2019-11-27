"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
var fs = require("fs");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require('cookie-parser');
var sessionStore = require('connect-pg-simple')(session);
var generellRoutes = require("../routes/routes");
var authRoutes = require("../routes/auth");
var pool = require("../protected/config");
var express = require("express");
var app = express();
var store = new sessionStore({
    pool: pool,
    tableName: 'session'
});
app.set('view engine', 'pug');
app.set('views', 'view');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(cookieParser());
app.use("/", generellRoutes);
app.use("/", authRoutes);
app.listen(process.env.PORT || 3000);
//const server = http.createServer(route);
//server.listen(3000);
//# sourceMappingURL=first_app.js.map