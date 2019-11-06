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
var queries = require("../queries/queries");
var createPlaylistInSpotify = require("../api_spotify/create_playlist");
var spotifyApiFollowPlaylist = require("../api_spotify/join_playlist");
var getTracksController = require("../controller/getTracks");
var getTracksApi = require("../api_spotify/getTracks");
var addTracksApi = require("../api_spotify/add_tracks");
var path = require("path");
var fs = require("fs");
var pathHelper = require("../helper/path");
var groups = [];
var p = path.join(pathHelper, "data", "product.json");
module.exports.createInstance = /** @class */ (function () {
    function Group(groupName, invitationLink, option, admin) {
        this.groupName = groupName;
        this.invitationLink = invitationLink;
        this.option = option;
        this.admin = admin;
    }
    return Group;
}());
module.exports.joinGroup = function (userID, data) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, queries.getAccessToken(userID)];
            case 1:
                accessToken = _a.sent();
                spotifyApiFollowPlaylist(accessToken, data.spotifyID, userID);
                return [4 /*yield*/, queries.getGroupNameFromDB(data.spotifyID)];
            case 2:
                _a.sent();
                data.groupName = "egal";
                fillPlaylist(accessToken, data.spotifyID);
                return [4 /*yield*/, queries.createGroupInDB(data, userID)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
module.exports.createGroup = function (userID, data) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, spotifyID;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, queries.getAccessToken(userID)];
            case 1:
                accessToken = _a.sent();
                return [4 /*yield*/, createGroupInSpotifyAndGetSpotifyID(accessToken, data.groupName, userID)];
            case 2:
                spotifyID = _a.sent();
                data.spotifyID = spotifyID;
                fillPlaylist(accessToken, data.spotifyID);
                return [4 /*yield*/, queries.createGroupInDB(data, userID)];
            case 3:
                _a.sent();
                getTracksController.getTracks(accessToken);
                return [2 /*return*/];
        }
    });
}); };
module.exports.getGroupsFromDB = function (userID) {
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var groups;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, queries.getGroups(userID)];
                case 1:
                    groups = _a.sent();
                    resolve(groups);
                    return [2 /*return*/];
            }
        });
    }); });
};
var createGroupInSpotifyAndGetSpotifyID = function (accessToken, playlistName, userID) { return __awaiter(void 0, void 0, void 0, function () {
    var spotifyID;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createPlaylistInSpotify(accessToken, playlistName, userID)];
            case 1:
                spotifyID = _a.sent();
                return [2 /*return*/, spotifyID];
        }
    });
}); };
function fillPlaylist(accessToken, playlistID) {
    return __awaiter(this, void 0, void 0, function () {
        var trackUriArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTracksApi.getTracks(accessToken)];
                case 1:
                    trackUriArray = _a.sent();
                    addTracksApi.addTracksToPlaylist(accessToken, playlistID, trackUriArray);
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=group.js.map