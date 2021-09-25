"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalChatMediaDeleted = exports.personalChatsCreated = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const storage_1 = require("../../helpers/storage");
const helpers_1 = require("../../helpers");
const functions_1 = require("../../helpers/functions");
exports.personalChatsCreated = functions.runWith(functions_1.defaultConfig).database.ref('chats/single/{path}')
    .onCreate(async (snap) => {
    const [id1, id2] = snap.key.split(helpers_1.PATH_SEPARATOR);
    const user1Ref = await admin.database().ref('profiles')
        .child(id1)
        .child('bio')
        .once('value');
    const user2Ref = await admin.database().ref('profiles')
        .child(id2)
        .child('bio')
        .once('value');
    await admin.database().ref('chats/meta')
        .update({
        [`${id1}/${id2}/bio`]: user2Ref.val(),
        [`${id2}/${id1}/bio`]: user1Ref.val()
    });
});
exports.personalChatMediaDeleted = functions.runWith(functions_1.defaultConfig).database.ref('chats/single/{path}/{chatId}/media')
    .onDelete(async (snap) => {
    var _a;
    await storage_1.deleteFromStorage((_a = snap.val()) === null || _a === void 0 ? void 0 : _a.path);
});
//# sourceMappingURL=chats.js.map