"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptSession = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cloud_task_1 = require("../../helpers/cloud-task");
const transactions_1 = require("../../helpers/modules/payments/transactions");
const helpers_1 = require("../../helpers/");
const users_1 = require("../../helpers/modules/users/users");
const functions_1 = require("../../helpers/functions");
exports.acceptSession = functions.runWith(functions_1.defaultConfig).https.onCall(async (data, context) => {
    var _a, _b;
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can accept sessions');
    const { id = '', accepted = false } = data;
    const ref = admin.firestore().collection('sessions').doc(id);
    const { duration = 15, studentId = '', tutorId = '', price = 10 } = (_a = (await ref.get()).data()) !== null && _a !== void 0 ? _a : {};
    if (context.auth.uid !== tutorId)
        throw new functions.https.HttpsError('failed-precondition', 'Only the nerd of the session can accept or reject it');
    try {
        if (accepted) {
            const tutorRef = admin.database().ref('profiles').child(tutorId).child('session');
            const lobby = (_b = (await tutorRef.child('lobby').once('value')).val()) !== null && _b !== void 0 ? _b : {};
            const lobbiedSessions = Object.entries(lobby);
            // * Create a gcloud task
            const taskName = await cloud_task_1.createTask({
                queue: 'sessions',
                endpoint: 'endSession',
                payload: { id },
                timeInSecs: (duration * 60) + (Date.now() / 1000) + 5 // plus 5 to account for round trips to servers
            });
            // * Create data object containing endTime, accepted and taskName
            const endedAt = admin.firestore.Timestamp.now().toDate();
            endedAt.setSeconds(endedAt.getSeconds() + 60 * duration);
            const data = { dates: { endedAt }, accepted: true, taskName };
            // * Create a batch to update accepted session and 499 other pending sessions
            const batch = admin.firestore().batch();
            batch.set(ref, data, { merge: true });
            const filteredLobbiedSessions = lobbiedSessions.filter(([sessionId, _]) => id !== sessionId);
            filteredLobbiedSessions.slice(0, 499).forEach(([sessionId, _]) => {
                const ref = admin.firestore().collection('sessions').doc(sessionId);
                batch.set(ref, { cancelled: { busy: true } }, { merge: true });
            });
            // * Create chunks of batches to handle remaining pending sessions
            await Promise.all([
                batch.commit(),
                ...users_1.chunkArray(filteredLobbiedSessions.slice(499), 500)
                    .map((chunk) => {
                    const newBatch = admin.firestore().batch();
                    chunk.forEach(([sessionId, _]) => {
                        const ref = admin.firestore().collection('sessions').doc(sessionId);
                        newBatch.set(ref, { cancelled: { busy: true } }, { merge: true });
                    });
                    return newBatch.commit();
                })
            ]);
            // * Update necessary things in rtdb
            await admin.database().ref('profiles')
                .update({
                [`${studentId}/session/requests/${id}`]: null,
                [`${studentId}/session/currentSession`]: id,
                [`${tutorId}/session/currentTutorSession`]: id,
                ...Object.fromEntries(lobbiedSessions.map(([sessionId, _]) => [
                    `${tutorId}/session/lobby/${sessionId}`,
                    null
                ]))
            });
            // * Pay tutor
            await transactions_1.addUserCoins(tutorId, { gold: price, bronze: 0 }, 'You got paid for a session');
            // * Refund other pending sessions
            await Promise.all(filteredLobbiedSessions
                .map(([_, student]) => student)
                .map(async (student) => await transactions_1.addUserCoins(student, { gold: price, bronze: 0 }, 'You got refunded for a rejected session')));
        }
        else {
            await ref.set({
                cancelled: { tutor: true }
            }, { merge: true });
            const chat = {
                from: tutorId,
                content: 'Session rejected',
                dates: { createdAt: admin.database.ServerValue.TIMESTAMP }
            };
            const chatId = helpers_1.getRandomValue();
            const path = [tutorId, studentId];
            await admin.database().ref()
                .update({
                [`profiles/${studentId}/session/requests/${id}`]: null,
                [`profiles/${tutorId}/session/lobby/${id}`]: null,
                // Chat Data
                [`chats/single/${helpers_1.getChatsPath(path)}/${chatId}`]: chat,
                [`chats/meta/${path[0]}/${path[1]}/last`]: { ...chat, id: chatId },
                [`chats/meta/${path[1]}/${path[0]}/last`]: { ...chat, id: chatId },
                [`chats/meta/${path[1]}/${path[0]}/unRead/${chatId}`]: true
            });
            await transactions_1.addUserCoins(studentId, { gold: price, bronze: 0 }, 'You got refunded for a rejected session');
        }
    }
    catch (error) {
        throw new functions.https.HttpsError('unknown', error.message);
    }
});
//# sourceMappingURL=acceptSession.js.map