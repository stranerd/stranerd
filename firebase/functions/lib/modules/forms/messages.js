"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCreated = void 0;
const functions = require("firebase-functions");
const email_1 = require("../../helpers/email");
const functions_1 = require("../../helpers/functions");
exports.messageCreated = functions.runWith(functions_1.defaultConfig).database.ref('forms/messages/{messageId}')
    .onCreate(async (snap) => {
    const { fName, lName, email, message, dates: { createdAt } } = snap.val();
    await email_1.sendNewFormMessageEmail({
        id: snap.key, fName, lName, email, message,
        date: new Date(createdAt).toLocaleString()
    });
    await snap.ref.remove();
});
//# sourceMappingURL=messages.js.map