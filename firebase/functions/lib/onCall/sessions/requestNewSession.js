"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestNewSession = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const helpers_1 = require("../../helpers");
const transactions_1 = require("../../helpers/modules/payments/transactions");
const functions_1 = require("../../helpers/functions");
const notifications_1 = require("../../helpers/modules/users/notifications");
exports.requestNewSession = functions.runWith(functions_1.defaultConfig).https.onCall(async (data, context) => {
    var _a, _b, _c;
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can request sessions');
    const { message, tutorId, studentId, price, duration, studentBio, tutorBio } = data.session;
    try {
        const session = {
            message, duration, price,
            studentId, tutorId, studentBio, tutorBio,
            accepted: false,
            cancelled: { student: false, tutor: false, busy: false },
            dates: { createdAt: admin.firestore.Timestamp.now() },
            reviews: {}
        };
        const chat = {
            from: studentId,
            content: message,
            dates: { createdAt: admin.database.ServerValue.TIMESTAMP }
        };
        const chatId = helpers_1.getRandomValue();
        const path = [studentId, tutorId];
        const doc = await admin.firestore().collection('sessions').add(session);
        const sessionId = doc.id;
        const tutorRef = await admin.database().ref('profiles').child(tutorId).child('session').once('value');
        const { currentTutorSession = null, lobby = {} } = (_a = tutorRef.val()) !== null && _a !== void 0 ? _a : {};
        if (currentTutorSession || Object.keys(lobby).length >= 10) {
            await doc.delete();
            throw new functions.https.HttpsError('failed-precondition', 'Tutor is currently in a session. Try again later.');
        }
        await admin.database().ref()
            .update({
            // Session Data
            [`profiles/${studentId}/account/meta/sessions/${sessionId}`]: true,
            [`profiles/${studentId}/session/requests/${sessionId}`]: true,
            [`profiles/${tutorId}/account/meta/tutorSessions/${sessionId}`]: true,
            [`profiles/${tutorId}/session/lobby/${sessionId}`]: true,
            // Chat Data
            [`chats/single/${helpers_1.getChatsPath(path)}/${chatId}`]: chat,
            [`chats/meta/${path[0]}/${path[1]}/last`]: { ...chat, id: chatId },
            [`chats/meta/${path[1]}/${path[0]}/last`]: { ...chat, id: chatId },
            [`chats/meta/${path[1]}/${path[0]}/unRead/${chatId}`]: true
        });
        await transactions_1.addUserCoins(studentId, { gold: 0 - price, bronze: 0 }, 'You paid coins for a session');
        await notifications_1.createNotification(tutorId, {
            title: 'New Session Request',
            body: `${(_c = (_b = studentBio === null || studentBio === void 0 ? void 0 : studentBio.name) === null || _b === void 0 ? void 0 : _b.first) !== null && _c !== void 0 ? _c : 'Anon'} is requesting a new ${duration !== null && duration !== void 0 ? duration : 15} minutes session with you!`,
            action: `/sessions/${studentId}`
        });
        return sessionId;
    }
    catch (error) {
        throw new functions.https.HttpsError('unknown', error.message);
    }
});
//# sourceMappingURL=requestNewSession.js.map