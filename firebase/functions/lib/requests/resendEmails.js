"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendEmails = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const email_1 = require("../helpers/email");
const functions_1 = require("../helpers/functions");
exports.resendEmails = functions.runWith(functions_1.defaultConfig).https.onRequest(async (_, res) => {
    var _a;
    const ref = await admin.database().ref('errors/emails').once('value');
    const emails = Object.entries(((_a = ref.val()) !== null && _a !== void 0 ? _a : {}))
        .map(([id, data]) => ({ ...data, id }));
    const result = await Promise.all(emails.map(async ({ subject, to, content, id, from }) => {
        const ref = admin.database().ref('errors/emails').child(id);
        try {
            await email_1.sendMail(to, subject, content, from);
            await ref.remove();
            return true;
        }
        catch (e) {
            await ref.update({
                'dates/triedAt': admin.database.ServerValue.TIMESTAMP,
                error: e.message
            });
            return false;
        }
    }));
    const tried = result.length;
    const succeeded = result.filter((r) => r).length;
    const failed = tried - succeeded;
    res.json({ tried, succeeded, failed });
});
//# sourceMappingURL=resendEmails.js.map