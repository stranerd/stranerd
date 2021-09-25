"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateTutor = void 0;
const functions = require("firebase-functions");
const tutors_1 = require("../../helpers/modules/users/tutors");
const functions_1 = require("../../helpers/functions");
exports.rateTutor = functions.runWith(functions_1.defaultConfig).https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can rate nerds');
    const authId = context.auth.uid;
    try {
        const { tutorId, rating, review } = data;
        if (!tutorId)
            throw new Error('no tutorId');
        await tutors_1.addTutorRatings(tutorId, rating);
        await tutors_1.addTutorReview(tutorId, authId, review, rating);
    }
    catch (e) {
        throw new functions.https.HttpsError('unknown', 'Error rating nerd');
    }
});
//# sourceMappingURL=rateTutor.js.map