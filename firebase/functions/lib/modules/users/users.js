"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAccountPurchaseCoinsUpdated = exports.userAccountDailyLoginUpdated = exports.userAccountBestAnswersUpdated = exports.userAccountAnswersUpdated = exports.userAccountQuestionsUpdated = exports.userAccountSessionsUpdated = exports.userAccountTutorSessionsUpdated = exports.userAccountRatingsUpdated = exports.userProfileUpdated = void 0;
const functions = require("firebase-functions");
const users_1 = require("../../helpers/modules/users/users");
const algolia_1 = require("../../helpers/algolia");
const ranks_1 = require("../../helpers/modules/users/ranks");
const storage_1 = require("../../helpers/storage");
const functions_1 = require("../../helpers/functions");
exports.userProfileUpdated = functions.runWith(functions_1.defaultConfig).database.ref('profiles/{userId}/bio')
    .onUpdate(async (snap, context) => {
    var _a, _b, _c;
    const oldBio = snap.before.val();
    const newBio = snap.after.val();
    const { userId } = context.params;
    await algolia_1.saveToAlgolia('users', userId, { user: { bio: newBio } });
    await users_1.updateMyChatsBio(userId, newBio);
    await users_1.updateMyQuestionsBio(userId, newBio);
    await users_1.updateMyAnswersBio(userId, newBio);
    await users_1.updateMyQuestionCommentsBio(userId, newBio);
    await users_1.updateMyAnswerCommentsBio(userId, newBio);
    await users_1.updateMySessionsBio(userId, newBio);
    await users_1.updateMyTutorSessionsBio(userId, newBio);
    if (((_a = oldBio === null || oldBio === void 0 ? void 0 : oldBio.avatar) === null || _a === void 0 ? void 0 : _a.path) !== ((_b = newBio === null || newBio === void 0 ? void 0 : newBio.avatar) === null || _b === void 0 ? void 0 : _b.path))
        await storage_1.deleteFromStorage((_c = oldBio === null || oldBio === void 0 ? void 0 : oldBio.avatar) === null || _c === void 0 ? void 0 : _c.path);
});
const path = 'profiles/{userId}/account/';
const callback = async (_, context) => {
    try {
        const { userId } = context.params;
        await ranks_1.checkRank(userId);
    }
    catch (err) { }
};
exports.userAccountRatingsUpdated = functions.database.ref(path + 'ratings').onWrite(callback);
exports.userAccountTutorSessionsUpdated = functions.database.ref(path + 'meta/tutorSessions').onWrite(callback);
exports.userAccountSessionsUpdated = functions.database.ref(path + 'meta/completedSessions').onWrite(callback);
exports.userAccountQuestionsUpdated = functions.database.ref(path + 'meta/questions').onWrite(callback);
exports.userAccountAnswersUpdated = functions.database.ref(path + 'meta/answers').onWrite(callback);
exports.userAccountBestAnswersUpdated = functions.database.ref(path + 'meta/bestAnswers').onWrite(callback);
exports.userAccountDailyLoginUpdated = functions.database.ref(path + 'streaks/longestStreak').onWrite(callback);
exports.userAccountPurchaseCoinsUpdated = functions.database.ref(path + 'bought').onWrite(callback);
//# sourceMappingURL=users.js.map