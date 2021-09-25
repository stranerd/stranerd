"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleAdmin = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const notifications_1 = require("../../helpers/modules/users/notifications");
const functions_1 = require("../../helpers/functions");
exports.toggleAdmin = functions.runWith(functions_1.defaultConfig).https.onCall(async (data, context) => {
    var _a;
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can manage user roles');
    if (!((_a = context.auth) === null || _a === void 0 ? void 0 : _a.token.isAdmin))
        throw new functions.https.HttpsError('failed-precondition', 'Only admins can manage user roles');
    try {
        const { id, isAdmin } = data;
        await admin.auth().setCustomUserClaims(id, { isAdmin });
        await admin.database().ref('profiles')
            .child(id).child('roles/isAdmin')
            .set(isAdmin !== null && isAdmin !== void 0 ? isAdmin : null);
        const body = isAdmin
            ? 'Your account has successfully been granted admin privileges'
            : 'Your admin privileges has been removed. Contact an admin if this was a mistake';
        await notifications_1.createNotification(id, {
            action: '/admin',
            title: 'Admin Privileges Modified',
            body
        });
    }
    catch (error) {
        throw new functions.https.HttpsError('unknown', error.message);
    }
});
//# sourceMappingURL=admins.js.map