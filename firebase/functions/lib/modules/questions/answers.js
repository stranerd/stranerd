"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerRated = exports.answerDeleted = exports.answerUpdated = exports.answerCreated = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const answers_1 = require("../../helpers/modules/questions/answers");
const tutors_1 = require("../../helpers/modules/users/tutors");
const algolia_1 = require("../../helpers/algolia");
const notifications_1 = require("../../helpers/modules/users/notifications");
const functions_1 = require("../../helpers/functions");
exports.answerCreated = functions.runWith(functions_1.defaultConfig).firestore.document('answers/{answerId}')
    .onCreate(async (snap, context) => {
    const answer = snap.data();
    const { userId = '', questionId = '', subjectId = '', tags = [] } = answer;
    const questionRef = await admin.firestore().collection('questions').doc(questionId);
    await questionRef.set({
        answers: admin.firestore.FieldValue.increment(1)
    }, { merge: true });
    const tagsData = Object.fromEntries(tags.map((tag) => [
        `tutor/tags/${tag}`,
        admin.database.ServerValue.increment(1)
    ]));
    await admin.database().ref('profiles').child(userId)
        .update({
        [`account/meta/answers/${snap.id}`]: true,
        [`account/meta/answeredQuestions/${questionId}`]: admin.database.ServerValue.increment(1),
        [`tutor/subjects/${subjectId}`]: admin.database.ServerValue.increment(1),
        ...tagsData
    });
    const { userId: questionUserId } = (await questionRef.get()).data();
    await notifications_1.createNotification(questionUserId, {
        body: 'Your question has been answered. Go have a look',
        action: `/questions/${questionId}#${context.params.answerId}`
    });
    await notifications_1.createNotification(questionUserId, {
        title: 'New Answer',
        body: 'You asked a question and we\'ve answered! Go view all answers to your question',
        action: `/questions/${questionId}#${context.params.answerId}`
    });
    await algolia_1.saveToAlgolia('answers', snap.id, { answer });
});
exports.answerUpdated = functions.runWith(functions_1.defaultConfig).firestore.document('answers/{answerId}')
    .onUpdate(async (snap) => {
    const before = snap.before.data();
    const after = snap.after.data();
    const oldTags = before.tags.filter((t) => !after.tags.includes(t));
    const newTags = after.tags.filter((t) => !before.tags.includes(t));
    const oldTagsData = Object.fromEntries(oldTags.map((t) => [
        `tutor/tags/${t}`,
        admin.database.ServerValue.increment(-1)
    ]));
    const newTagsData = Object.fromEntries(newTags.map((t) => [
        `tutor/tags/${t}`,
        admin.database.ServerValue.increment(1)
    ]));
    const subject = before.subjectId !== after.subjectId
        ? {
            [`tutor/subjects/${before.subjectId}`]: admin.database.ServerValue.increment(-1),
            [`tutor/subjects/${after.subjectId}`]: admin.database.ServerValue.increment(1)
        }
        : {};
    await admin.database().ref('profiles').child(after.userId)
        .update({ ...oldTagsData, ...newTagsData, ...subject });
    await algolia_1.saveToAlgolia('answers', snap.after.id, { answer: after });
});
exports.answerDeleted = functions.runWith(functions_1.defaultConfig).firestore.document('answers/{answerId}')
    .onDelete(async (snap) => {
    const { questionId, subjectId, userId, tags = [] } = snap.data();
    const tagsData = Object.fromEntries(tags.map((tag) => [
        `tutor/tags/${tag}`,
        admin.database.ServerValue.increment(-1)
    ]));
    await admin.firestore().runTransaction(async (t) => {
        var _a;
        const questionRef = admin.firestore().collection('questions').doc(questionId);
        const question = await t.get(questionRef);
        const { answered: { first = null, second = null } = {} } = (_a = question.data()) !== null && _a !== void 0 ? _a : {};
        const data = {
            answers: admin.firestore.FieldValue.increment(-1),
            answered: {}
        };
        if (first === snap.id)
            data.answered = { first: null, second };
        if (second === snap.id)
            data.answered = { first, second: null };
        await t.set(questionRef, data, { merge: true });
    });
    await admin.database().ref('profiles').child(userId)
        .update({
        [`account/meta/answers/${snap.id}`]: null,
        [`account/meta/bestAnswers/${snap.id}`]: null,
        [`account/meta/answeredQuestions/${questionId}`]: admin.database.ServerValue.increment(-1),
        [`tutor/subjects/${subjectId}`]: admin.database.ServerValue.increment(-1),
        [`comments/answers/${snap.id}`]: null,
        [`answers/${snap.id}/ratings`]: null,
        ...tagsData
    });
    await algolia_1.deleteFromAlgolia('answers', snap.id);
});
exports.answerRated = functions.runWith(functions_1.defaultConfig).database.ref('answers/{answerId}/ratings/{userId}')
    .onCreate(async (snap, context) => {
    var _a;
    const { answerId, userId } = context.params;
    const ratings = (_a = snap.val()) !== null && _a !== void 0 ? _a : 0;
    await admin.database().ref('profiles').child(userId).child('account/meta')
        .child(`ratedAnswers/${answerId}`).set(ratings);
    await admin.firestore().runTransaction(async (t) => {
        var _a, _b, _c, _d, _e;
        const answerRef = admin.firestore().collection('answers').doc(answerId);
        const answer = (_a = (await t.get(answerRef)).data()) !== null && _a !== void 0 ? _a : {};
        const { tutorId = '', questionId = '' } = answer;
        const { total = 0, count = 0 } = (_b = answer.ratings) !== null && _b !== void 0 ? _b : {};
        const rating = count === 0 ? 0 : total / count;
        if (questionId) {
            const questionRef = admin.firestore().collection('questions').doc(questionId);
            const question = (_c = (await t.get(questionRef)).data()) !== null && _c !== void 0 ? _c : {};
            const isAnswered = ((_d = question === null || question === void 0 ? void 0 : question.answerId) === null || _d === void 0 ? void 0 : _d.first) && ((_e = question === null || question === void 0 ? void 0 : question.answerId) === null || _e === void 0 ? void 0 : _e.second);
            if (!isAnswered && count >= 19 && rating > 3.5)
                await answers_1.markAnswerAsBest(questionId, answerId, question, answer);
            if (tutorId) {
                await tutors_1.addTutorRatings(tutorId, ratings);
                await notifications_1.createNotification(tutorId, {
                    body: 'Your answer just got rated. Go have a look',
                    action: `/questions/${questionId}#${answerId}`
                });
            }
        }
        t.set(answerRef, {
            ratings: {
                total: admin.firestore.FieldValue.increment(ratings),
                count: admin.firestore.FieldValue.increment(1)
            }
        }, { merge: true });
    });
});
//# sourceMappingURL=answers.js.map