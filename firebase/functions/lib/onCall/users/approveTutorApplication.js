"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveTutorApplication = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const notifications_1 = require("../../helpers/modules/users/notifications");
exports.approveTutorApplication = functions.https.onCall(async (data, context) => {
    var _a, _b;
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can approve nerd applications');
    if (!((_a = context.auth) === null || _a === void 0 ? void 0 : _a.token.isAdmin))
        throw new functions.https.HttpsError('failed-precondition', 'Only admin users can approve nerd applications');
    try {
        const { id, approved } = data;
        const appRef = await admin.firestore().collection('tutorApplications').doc(id).get();
        const { userId, subjectId } = appRef.data();
        await admin.firestore().collection('tutorApplications').doc(id).delete();
        if (approved) {
            const userRef = await admin.database().ref('profiles')
                .child(userId).child('roles/isTutor').once('value');
            if (userRef.val())
                throw new functions.https.HttpsError('unknown', 'User is already a nerd. Application will be deleted');
            await admin.database().ref('profiles')
                .child(userId)
                .update({
                'roles/isTutor': true,
                tutor: {
                    ratings: { total: 0, count: 0 },
                    subject: { id: subjectId, level: 0 }
                }
            });
            await notifications_1.createNotification(userId, {
                action: '/account',
                title: 'Nerd Privileges Modified',
                body: 'Your application to be a nerd was approved'
            });
        }
        else
            await notifications_1.createNotification(userId, {
                action: '/account',
                title: 'Nerd Privileges Modified',
                body: 'Your application to be a nerd was rejected'
            });
    }
    catch (e) {
        throw new functions.https.HttpsError('unknown', (_b = e.message) !== null && _b !== void 0 ? _b : 'Error approving applications');
    }
});
//# sourceMappingURL=approveTutorApplication.js.map