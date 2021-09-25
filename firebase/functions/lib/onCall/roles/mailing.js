"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToMailingList = void 0;
const functions = require("firebase-functions");
const mailingList_1 = require("../../helpers/mailingList");
const functions_1 = require("../../helpers/functions");
exports.subscribeToMailingList = functions.runWith(functions_1.defaultConfig).https.onCall(async ({ email }) => {
    try {
        await mailingList_1.subscribeToMailchimpList(email);
    }
    catch (error) {
        throw new functions.https.HttpsError('unknown', error.message);
    }
});
//# sourceMappingURL=mailing.js.map