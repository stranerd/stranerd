"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUnVerifiedUsers = exports.authUserDeleted = exports.authUserCreated = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mailingList_1 = require("./helpers/mailingList");
const environment_1 = require("./helpers/environment");
const algolia_1 = require("./helpers/algolia");
const functions_1 = require("./helpers/functions");
exports.authUserCreated = functions.runWith(functions_1.defaultConfig).auth.user().onCreate(async (user) => {
    var _a, _b, _c, _d;
    const [first = null, last = null] = (_b = (_a = user.displayName) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
    const data = {
        ...(first ? { 'bio/name/first': first } : {}),
        ...(last ? { 'bio/name/last': last } : {}),
        'bio/email': (_d = (_c = user.email) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== null && _d !== void 0 ? _d : null,
        ...(first && last ? {} : { 'bio/isNew': true }),
        'dates/signedUpAt': admin.database.ServerValue.TIMESTAMP,
        'account/coins/bronze': admin.database.ServerValue.increment(100),
        'account/coins/gold': admin.database.ServerValue.increment(10),
        'account/streak/longestStreak': 1,
        'account/streak/count': 1,
        'account/streak/lastCheck': admin.database.ServerValue.TIMESTAMP
    };
    const profileData = Object.fromEntries(Object.entries(data)
        .map(([key, val]) => [`profiles/${user.uid}/${key}`, val]));
    await admin.database().ref()
        .update({
        ...profileData,
        [`userIds/${user.uid}`]: true
    });
    try {
        if (environment_1.isProduction())
            await mailingList_1.subscribeToMailchimpList(user.email);
    }
    catch (error) {
        console.log(`Failed to create mailchimp user: ${user.uid}-${user.email}.\n${error.message}`);
    }
});
exports.authUserDeleted = functions.runWith(functions_1.defaultConfig).auth.user().onDelete(async (user) => {
    await admin.database().ref()
        .update({
        [`profiles/${user.uid}/dates/deletedAt`]: admin.database.ServerValue.TIMESTAMP,
        [`userIds/${user.uid}`]: false
    });
    await algolia_1.deleteFromAlgolia('users', user.uid);
});
const deleteUnVerifiedUsers = async () => {
    try {
        const userIds = [];
        const listAllUsers = async (nextPageToken) => {
            try {
                const { users, pageToken } = await admin.auth().listUsers(1000, nextPageToken);
                users.forEach((user) => {
                    if (user.emailVerified)
                        return;
                    const createdAt = new Date(user.metadata.creationTime);
                    const threeDays = 3 * 86400 * 1000;
                    if (Date.now() - createdAt.getTime() < threeDays)
                        return;
                    userIds.push(user.uid);
                });
                if (pageToken)
                    await listAllUsers(pageToken);
            }
            catch (err) { }
        };
        await listAllUsers();
        userIds.forEach(admin.auth().deleteUser);
    }
    catch (err) { }
};
exports.deleteUnVerifiedUsers = deleteUnVerifiedUsers;
//# sourceMappingURL=auth.js.map