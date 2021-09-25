"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsBestAnswer = void 0;
const functions = require("firebase-functions");
const answers_1 = require("../../helpers/modules/questions/answers");
const functions_1 = require("../../helpers/functions");
exports.markAsBestAnswer = functions.runWith(functions_1.defaultConfig).https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can select best answers');
    const { questionId, answerId } = data;
    await answers_1.markAnswerAsBest(questionId, answerId);
});
//# sourceMappingURL=markAsBestAnswer.js.map