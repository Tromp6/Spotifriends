"use strict";
var http = require('http');
var fs = require("fs");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/note", function (req, res, next) {
    res.redirect("/");
    res.send("<h1>ka</h1>");
});
app.use("/", function (req, res, next) {
    res.send('<form action="/note" method="POST"><input type="text" name="title"><button type="submit">Add Note</Form>');
    next();
});
app.listen(3000);
//const server = http.createServer(route);
//server.listen(3000);
//# sourceMappingURL=first_app.js.map