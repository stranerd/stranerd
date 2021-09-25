"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAnswerAsBest = void 0;
const admin = require("firebase-admin");
const transactions_1 = require("../payments/transactions");
const notifications_1 = require("../users/notifications");
const markAnswerAsBest = async (questionId, answerId, question, answer) => {
    if (questionId && answerId) {
        const questionRef = admin.firestore().collection('questions').doc(questionId);
        const { coins, answerId: answered = {} } = question || (await questionRef.get()).data() || {};
        const answerRef = admin.firestore().collection('answers').doc(answerId);
        const { userId } = answer || (await answerRef.get()).data() || {};
        const batch = admin.firestore().batch();
        batch.set(questionRef, {
            answerId: {
                [answered.first ? 'second' : 'first']: answerId
            }
        }, { merge: true });
        batch.set(answerRef, { best: true }, { merge: true });
        await batch.commit();
        await admin.database().ref('profiles')
            .update({
            [`${userId}/account/meta/bestAnswers/${answerId}`]: true
        });
        await transactions_1.addUserCoins(userId, { bronze: coins * 0.5, gold: 0 }, 'You got coins for a best answer');
        await notifications_1.createNotification(userId, {
            body: 'Congratulations. Your answer was selected as one of the best answers. Go have a look',
            action: `/questions/${questionId}#${answerId}`
        });
    }
};
exports.markAnswerAsBest = markAnswerAsBest;
//# sourceMappingURL=answers.js.map