"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTutor = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const notifications_1 = require("../../helpers/modules/users/notifications");
exports.toggleTutor = functions.https.onCall(async (data, context) => {
    var _a;
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can manage tutors');
    if (!((_a = context.auth) === null || _a === void 0 ? void 0 : _a.token.isAdmin))
        throw new functions.https.HttpsError('failed-precondition', 'Only admins can manage tutors');
    try {
        const { id, isTutor } = data;
        await admin.database().ref('profiles')
            .child(id)
            .update({
            'roles/isTutor': isTutor,
            tutor: isTutor ? { ratings: { total: 0, count: 0 } } : null
        });
        await notifications_1.createNotification(id, {
            action: '/account',
            title: 'Nerd Privileges Modified',
            body: isTutor
                ? 'Your account has successfully been granted nerd privileges'
                : 'Your nerd privileges has been removed. Contact an admin if this was a mistake'
        });
    }
    catch (error) {
        throw new functions.https.HttpsError('unknown', error.message);
    }
});
//# sourceMappingURL=tutors.js.map