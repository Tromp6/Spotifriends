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
var pool = require("../protected/pool_config");
var async = require("async_hooks");
module.exports.createGroupInDB = function (groupInstance, userID) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createGroupTable(groupInstance).then(function (groupID) {
                    createGroupUserTable(groupID, userID);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
function createGroupTable(groupInstance) {
    var groupName = groupInstance.groupName, spotifyID = groupInstance.spotifyID, option = groupInstance.option, invitationLink = groupInstance.invitationLink, admin = groupInstance.admin;
    return new Promise(function (resolve, reject) {
        pool.query('INSERT INTO groups(group_name, spotify_id, option, invitation_link, admin) VALUES ($1, $2, $3, $4, $5) RETURNING id', [groupName, spotifyID, option, invitationLink, admin], function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                resolve(result.rows[0].id);
            }
        });
    });
}
function createGroupUserTable(groupID, userID) {
    pool.query('INSERT INTO groups_users(user_id, group_id) VALUES ($1, $2)', [userID, groupID], function (error, result) {
        if (error) {
            throw error;
        }
    });
}
;
module.exports.getGroups = function (userID) {
    var groups = [];
    return new Promise(function (resolve) {
        pool.query("SELECT * FROM groups_users WHERE user_id = $1;", [userID], function (err, result) { return __awaiter(void 0, void 0, void 0, function () {
            var i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!result) return [3 /*break*/, 5];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < result.rows.length)) return [3 /*break*/, 4];
                        _b = (_a = groups).push;
                        return [4 /*yield*/, getSpecificGroup(result.rows[i].group_id)];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        resolve(groups);
                        return [3 /*break*/, 6];
                    case 5:
                        resolve([]);
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    });
};
function getSpecificGroup(group_id) {
    return new Promise(function (resolve) {
        pool.query("SELECT * FROM groups WHERE id = $1;", [group_id], function (err, result) {
            resolve(result.rows[0]);
        });
    });
}
module.exports.saveTokensToDB = function (accessToken, refreshToken, userID) {
    pool.query('INSERT INTO users(access_token, refresh_token) VALUES ($1, $2) WHERE id = $3', [accessToken, refreshToken, userID], function (error, result) {
        if (error) {
            throw error;
        }
    });
};
module.exports.saveUserInformationToDB = function (userID, userName, email) {
    pool.query('INSERT INTO users(id, name, email) VALUES ($1, $2, $3)', [userID, userName, email], function (error, result) {
        if (error) {
            throw error;
        }
    });
};
module.exports.saveUserToDB = function (user) {
    pool.query('INSERT INTO users(id, name, email, access_token, refresh_token) VALUES ($1, $2, $3, $4, $5)', [user.userID, user.userName, user.email, user.accessToken, user.refreshToken], function (error, result) {
        if (error) {
            throw error;
        }
    });
};
module.exports.updateUserInDB = function (user) {
    pool.query('UPDATE users SET name = $1, email = $2 , access_token = $3 , refresh_token = $4 WHERE id = $5', [user.userName, user.email, user.accessToken, user.refreshToken, user.userID], function (error, result) {
        if (error) {
            throw error;
        }
    });
};
module.exports.getUser = function (userID) {
    return new Promise(function (resolve) {
        pool.query('SELECT * FROM users WHERE id = $1', [userID], function (error, result) {
            if (error) {
                throw error;
            }
            if (result.rowCount === 0) {
                result = null;
            }
            resolve(result);
        });
    });
};
module.exports.getAccessToken = function (userID) {
    return new Promise(function (resolve) {
        pool.query("SELECT access_token FROM users WHERE id = $1;", [userID], function (err, result) {
            resolve(result.rows[0].access_token);
        });
    });
};
module.exports.getGroupNameFromDB = function (spotifyID) {
    return new Promise(function (resolve) {
        pool.query("SELECT group_name FROM groups WHERE spotify_id = $1", [spotifyID], function (err, result) {
            console.log(result);
            resolve();
        });
    });
};
//# sourceMappingURL=queries.js.map