"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionDeleted = exports.questionUpdated = exports.questionCreated = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algolia_1 = require("../../helpers/algolia");
const transactions_1 = require("../../helpers/modules/payments/transactions");
const functions_1 = require("../../helpers/functions");
const notifications_1 = require("../../helpers/modules/users/notifications");
exports.questionCreated = functions.firestore.document('questions/{questionId}')
    .onCreate(async (snap) => {
    var _a;
    const question = snap.data();
    const { coins = 0, userId = '', tags = [], subjectId = '' } = question;
    const tagsData = Object.fromEntries(tags.map((t) => [
        `tags/${t}/count`,
        admin.database.ServerValue.increment(1)
    ]));
    await admin.database().ref().update({
        [`profiles/${userId}/account/meta/questions/${snap.id}`]: true,
        ...tagsData
    });
    await transactions_1.addUserCoins(userId, { bronze: 0 - coins, gold: 0 }, 'You paid coins to ask a question');
    await algolia_1.saveToAlgolia('questions', snap.id, { question });
    const tutorRefs = await admin.database().ref('profiles')
        .orderByChild('tutor/strongestSubject')
        .equalTo(subjectId)
        .once('value');
    const tutorIds = Object.keys((_a = tutorRefs.val()) !== null && _a !== void 0 ? _a : {});
    await Promise.all(tutorIds.map(async (id) => await notifications_1.createNotification(id, {
        title: 'New Question',
        body: 'A new question was just asked on Stranerd that you might be interested in. Go check it out',
        action: `/questions/${snap.id}`
    })));
});
exports.questionUpdated = functions.runWith(functions_1.defaultConfig).firestore.document('questions/{questionId}')
    .onUpdate(async (snap) => {
    const before = snap.before.data();
    const after = snap.after.data();
    const coins = after.coins - before.coins;
    const oldTags = before.tags.filter((t) => !after.tags.includes(t));
    const newTags = after.tags.filter((t) => !before.tags.includes(t));
    const oldTagsData = Object.fromEntries(oldTags.map((t) => [
        `tags/${t}/count`,
        admin.database.ServerValue.increment(-1)
    ]));
    const newTagsData = Object.fromEntries(newTags.map((t) => [
        `tags/${t}/count`,
        admin.database.ServerValue.increment(1)
    ]));
    await admin.database().ref().update({ ...oldTagsData, ...newTagsData });
    if (coins !== 0)
        await transactions_1.addUserCoins(after.userId, { bronze: 0 - coins, gold: 0 }, coins > 0 ? 'You paid coins to upgrade a question' : 'You got refunded coins from downgrading a question');
    await algolia_1.saveToAlgolia('questions', snap.after.id, { question: after });
});
exports.questionDeleted = functions.runWith(functions_1.defaultConfig).firestore.document('questions/{questionId}')
    .onDelete(async (snap) => {
    const { userId, tags } = snap.data();
    const tagsData = Object.fromEntries(tags.map((t) => [
        `tags/${t}/count`,
        admin.database.ServerValue.increment(-1)
    ]));
    await admin.database().ref().update({
        [`profiles/${userId}/account/meta/questions/${snap.id}`]: null,
        [`comments/questions/${snap.id}`]: null,
        ...tagsData
    });
    const answers = await admin.firestore().collection('answers')
        .where('questionId', '==', snap.id)
        .get();
    await Promise.all(answers.docs.map(async (a) => {
        await admin.firestore().collection('answers').doc(a.id).delete();
    }));
    await algolia_1.deleteFromAlgolia('questions', snap.id);
});
//# sourceMappingURL=questions.js.map