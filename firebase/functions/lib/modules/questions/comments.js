"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerCommentDeleted = exports.questionCommentDeleted = exports.answerCommentCreated = exports.questionCommentCreated = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const helpers_1 = require("../../helpers");
const notifications_1 = require("../../helpers/modules/users/notifications");
const functions_1 = require("../../helpers/functions");
exports.questionCommentCreated = functions.runWith(functions_1.defaultConfig).database.ref('comments/questions/{questionId}/{commentId}')
    .onCreate(async (snap, context) => {
    const { questionId, commentId } = context.params;
    const questionRef = admin.firestore().collection('questions').doc(questionId);
    await questionRef.set({
        comments: {
            count: admin.firestore.FieldValue.increment(1)
        }
    }, { merge: true });
    const { userId } = snap.val();
    await admin.database().ref('profiles').child(userId).child('account/meta')
        .child(`questionComments/${questionId}${helpers_1.PATH_SEPARATOR}${commentId}`).set(true);
    const { userId: questionUserId } = (await questionRef.get()).data();
    await notifications_1.createNotification(questionUserId, {
        body: 'Your question has a new comment. Go have a look',
        action: `/questions/${questionId}`
    });
});
exports.answerCommentCreated = functions.runWith(functions_1.defaultConfig).database.ref('comments/answers/{answerId}/{commentId}')
    .onCreate(async (snap, context) => {
    const { answerId, commentId } = context.params;
    const answerRef = admin.firestore().collection('answers').doc(answerId);
    await answerRef.set({
        comments: {
            count: admin.firestore.FieldValue.increment(1)
        }
    }, { merge: true });
    const { userId } = snap.val();
    await admin.database().ref('profiles').child(userId).child('account/meta')
        .child(`answerComments/${answerId}${helpers_1.PATH_SEPARATOR}${commentId}`).set(true);
    const { userId: answerUserId, questionId } = (await answerRef.get()).data();
    await notifications_1.createNotification(answerUserId, {
        body: 'Your question has a new comment. Go have a look',
        action: `/questions/${questionId}#${answerId}`
    });
});
exports.questionCommentDeleted = functions.runWith(functions_1.defaultConfig).database.ref('comments/questions/{questionId}/{commentId}')
    .onDelete(async (snap, context) => {
    const { questionId, commentId } = context.params;
    await admin.firestore().collection('questions')
        .doc(questionId)
        .set({
        comments: {
            count: admin.firestore.FieldValue.increment(-1)
        }
    }, { merge: true });
    const { userId } = snap.val();
    await admin.database().ref('profiles').child(userId).child('account/meta')
        .child(`questionComments/${questionId}${helpers_1.PATH_SEPARATOR}${commentId}`).set(null);
});
exports.answerCommentDeleted = functions.runWith(functions_1.defaultConfig).database.ref('comments/answers/{answerId}/{commentId}')
    .onDelete(async (snap, context) => {
    const { answerId, commentId } = context.params;
    await admin.firestore().collection('answers')
        .doc(answerId)
        .set({
        comments: {
            count: admin.firestore.FieldValue.increment(-1)
        }
    }, { merge: true });
    const { userId } = snap.val();
    await admin.database().ref('profiles').child(userId).child('account/meta')
        .child(`answerComments/${answerId}${helpers_1.PATH_SEPARATOR}${commentId}`).set(null);
});
//# sourceMappingURL=comments.js.map