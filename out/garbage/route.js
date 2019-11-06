"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var s = require("fs");
var requestHandler = function (req, res) {
    var url = req.url;
    var methodType = req.method;
    if (url === "/") {
        res.write("<html>");
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"></body>');
        res.write("<html>");
        res.end();
        return null;
    }
    else if (url === "/message" && methodType === "POST") {
        var dataChunks_1 = [];
        req.on("data", function (chunk) {
            dataChunks_1.push(chunk);
        });
        req.on("end", function () {
            var parsedData = Buffer.concat(dataChunks_1).toString();
            fs.writeFileSync("message.txt", parsedData);
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        });
    }
};
module.exports = requestHandler;
//# sourceMappingURL=route.js.map