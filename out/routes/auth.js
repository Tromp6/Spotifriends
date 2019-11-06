"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var querystring = require('querystring');
var request = require('request');
var generateRandomString = require('../helper/generateRandomString');
var userController = require('../controller/user');
var session = require('express-session');
var router = express.Router();
var stateKey = 'spotify_auth_state';
var redirect_uri = "http://localhost:3000/loggedIn";
var client_secret = "8a6e11782c8347ef91fafce646db34b8";
var client_id = "9fac1cc7c3864dfd925c0deb2e7b04eb";
router.get("/login", function (req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    var scope = 'user-read-email playlist-modify-public playlist-modify-private user-top-read';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});
router.get("/loggedIn", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, state, storedState, playlistID;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.query.code || null;
                state = req.query.state || null;
                storedState = req.cookies ? req.cookies[stateKey] : null;
                playlistID = req.cookies["playlistID"];
                if (!(state === null || state !== storedState)) return [3 /*break*/, 1];
                res.redirect('/login' +
                    querystring.stringify({
                        error: 'state_mismatch'
                    }));
                return [3 /*break*/, 3];
            case 1:
                res.clearCookie(stateKey);
                req.session.isLoggedIn = true;
                return [4 /*yield*/, userController.controller(code, req)];
            case 2:
                _a.sent();
                if (playlistID === undefined) {
                    res.redirect('/');
                }
                else {
                    res.clearCookie("playlistID");
                    res.redirect('http://localhost:3000/joinGroup?playlistID=' + playlistID);
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
router.use(function (req, res, next) {
    res.status(404).send('<h1>Page not found</h1>');
});
module.exports = router;
//# sourceMappingURL=auth.js.map