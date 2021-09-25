"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endSession = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const functions_1 = require("../helpers/functions");
exports.endSession = functions.runWith(functions_1.defaultConfig).https.onRequest(async (request, response) => {
    var _a;
    try {
        const { id } = request.body;
        const ref = admin.firestore().collection('sessions').doc(id);
        const session = await ref.get();
        const { cancelled: { student = false, tutor = false, busy = false } = {}, studentId = '', tutorId = '' } = (_a = session.data()) !== null && _a !== void 0 ? _a : {};
        await ref.set({ done: true }, { merge: true });
        await admin.database().ref('profiles')
            .child(studentId)
            .child('session/currentSession')
            .transaction((session) => {
            if (session === id)
                return null;
            return session;
        });
        await admin.database().ref('profiles')
            .child(tutorId)
            .child('session/currentTutorSession')
            .transaction((session) => {
            if (session === id)
                return null;
            return session;
        });
        if (!student && !tutor && !busy)
            await admin.database().ref('profiles')
                .update({
                [`${studentId}/account/meta/completedSessions/${id}`]: true,
                [`${tutorId}/account/meta/completedTutorSessions/${id}`]: true
            });
        response.json({ success: true });
    }
    catch (error) {
        response.status(400).json({ error });
    }
});
//# sourceMappingURL=endSession.js.map