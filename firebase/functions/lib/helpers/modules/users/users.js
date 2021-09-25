"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyChatsBio = exports.updateMyTutorSessionsBio = exports.updateMySessionsBio = exports.updateMyAnswerCommentsBio = exports.updateMyQuestionCommentsBio = exports.updateMyAnswersBio = exports.updateMyQuestionsBio = exports.chunkArray = exports.getAllUserIds = void 0;
const admin = require("firebase-admin");
const index_1 = require("../../index");
const getAllUserIds = async () => {
    const userIdsRef = await admin.database().ref('userIds').once('value');
    const userIdsObjects = userIdsRef.val();
    return Object.keys(userIdsObjects !== null && userIdsObjects !== void 0 ? userIdsObjects : {});
};
exports.getAllUserIds = getAllUserIds;
const chunkArray = (arr, size) => new Array(Math.ceil(arr.length / size))
    .fill([])
    .map((_, index) => arr.slice(index * size, (index + 1) * size))
    .filter((chunk) => chunk.length > 0);
exports.chunkArray = chunkArray;
const updateMyQuestionsBio = async (userId, user) => {
    var _a;
    try {
        const questionIdRefs = await admin.database().ref('profiles')
            .child(userId)
            .child('account/meta/questions')
            .once('value');
        const questionIds = Object.keys((_a = questionIdRefs.val()) !== null && _a !== void 0 ? _a : {});
        const chunks = exports.chunkArray(questionIds, 500);
        await Promise.all(chunks.map(async (chunk) => {
            const batch = admin.firestore().batch();
            chunk.forEach((questionId) => {
                const ref = admin.firestore().collection('questions').doc(questionId);
                batch.set(ref, { user }, { merge: true });
            });
            return await batch.commit();
        }));
    }
    catch (error) {
        console.log(`Error updating bios of ${userId} questions`);
    }
};
exports.updateMyQuestionsBio = updateMyQuestionsBio;
const updateMyAnswersBio = async (userId, user) => {
    var _a;
    try {
        const answerIdRefs = await admin.database().ref('profiles')
            .child(userId)
            .child('account/meta/answers')
            .once('value');
        const answerIds = Object.keys((_a = answerIdRefs.val()) !== null && _a !== void 0 ? _a : {});
        const chunks = exports.chunkArray(answerIds, 500);
        await Promise.all(chunks.map(async (chunk) => {
            const batch = admin.firestore().batch();
            chunk.forEach((answerId) => {
                const ref = admin.firestore().collection('answers').doc(answerId);
                batch.set(ref, { user }, { merge: true });
            });
            return await batch.commit();
        }));
    }
    catch (error) {
        console.log(`Error updating bios of ${userId} answers`);
    }
};
exports.updateMyAnswersBio = updateMyAnswersBio;
const updateMyQuestionCommentsBio = async (userId, user) => {
    var _a;
    try {
        const commentIdRefs = await admin.database().ref('profiles')
            .child(userId)
            .child('account/meta/questionComments')
            .once('value');
        const commentIds = Object.keys((_a = commentIdRefs.val()) !== null && _a !== void 0 ? _a : {});
        const data = Object.fromEntries(commentIds.map((id) => [id.replace(index_1.PATH_SEPARATOR, '/') + '/user', user]));
        await admin.database().ref('comments/questions').update(data);
    }
    catch (error) {
        console.log(`Error updating bios of ${userId} question-comments`);
    }
};
exports.updateMyQuestionCommentsBio = updateMyQuestionCommentsBio;
const updateMyAnswerCommentsBio = async (userId, user) => {
    var _a;
    try {
        const commentIdRefs = await admin.database().ref('profiles')
            .child(userId)
            .child('account/meta/answerComments')
            .once('value');
        const commentIds = Object.keys((_a = commentIdRefs.val()) !== null && _a !== void 0 ? _a : {});
        const data = Object.fromEntries(commentIds.map((id) => [id.replace(index_1.PATH_SEPARATOR, '/') + '/user', user]));
        await admin.database().ref('comments/answers').update(data);
    }
    catch (error) {
        console.log(`Error setting bios of ${userId} answer-comments`);
    }
};
exports.updateMyAnswerCommentsBio = updateMyAnswerCommentsBio;
const updateMySessionsBio = async (userId, user) => {
    var _a;
    try {
        const sessionIdRefs = await admin.database().ref('profiles')
            .child(userId)
            .child('account/meta/sessions')
            .once('value');
        const sessionIds = Object.keys((_a = sessionIdRefs.val()) !== null && _a !== void 0 ? _a : {});
        const chunks = exports.chunkArray(sessionIds, 500);
        await Promise.all(chunks.map(async (chunk) => {
            const batch = admin.firestore().batch();
            chunk.forEach((sessionId) => {
                const ref = admin.firestore().collection('sessions').doc(sessionId);
                batch.set(ref, { studentBio: user }, { merge: true });
            });
            return await batch.commit();
        }));
    }
    catch (error) {
        console.log(`Error updating bios of ${userId} attended sessions`);
    }
};
exports.updateMySessionsBio = updateMySessionsBio;
const updateMyTutorSessionsBio = async (userId, user) => {
    var _a;
    try {
        const sessionIdRefs = await admin.database().ref('profiles')
            .child(userId)
            .child('account/meta/tutorSessions')
            .once('value');
        const sessionIds = Object.keys((_a = sessionIdRefs.val()) !== null && _a !== void 0 ? _a : {});
        const chunks = exports.chunkArray(sessionIds, 500);
        await Promise.all(chunks.map(async (chunk) => {
            const batch = admin.firestore().batch();
            chunk.forEach((sessionId) => {
                const ref = admin.firestore().collection('sessions').doc(sessionId);
                batch.set(ref, { tutorBio: user }, { merge: true });
            });
            return await batch.commit();
        }));
    }
    catch (error) {
        console.log(`Error updating bios of ${userId} hosted sessions`);
    }
};
exports.updateMyTutorSessionsBio = updateMyTutorSessionsBio;
const updateMyChatsBio = async (userId, user) => {
    var _a;
    try {
        const chatRefs = await admin.database().ref('chats/meta')
            .child(userId)
            .once('value');
        const chatIds = Object.keys((_a = chatRefs.val()) !== null && _a !== void 0 ? _a : {});
        const data = Object.fromEntries(chatIds.map((id) => [`${id}/${userId}/bio`, user]));
        await admin.database().ref('chats/meta').update(data);
    }
    catch (error) {
        console.log(`Error updating bios of ${userId} chats`);
    }
};
exports.updateMyChatsBio = updateMyChatsBio;
//# sourceMappingURL=users.js.map