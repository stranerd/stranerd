"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOlderNotifications = exports.createNotification = void 0;
const admin = require("firebase-admin");
const email_1 = require("../../email");
const users_1 = require("./users");
const createNotification = async (userId, data) => {
    try {
        // @ts-ignore
        if (data.title) {
            const emailRef = await admin.database().ref(`profiles/${userId}/bio/email`).once('value');
            const email = emailRef.val();
            // @ts-ignore
            if (email)
                await email_1.sendNewNotificationEmail(email, data);
        }
        else
            await admin.database().ref(`users/${userId}/notifications`)
                .push({
                ...data, seen: false,
                dates: { createdAt: admin.database.ServerValue.TIMESTAMP }
            });
    }
    catch (e) {
        console.log(`Failed to create notification for: ${userId}.\n${e.message}`);
    }
};
exports.createNotification = createNotification;
const getOldNotifications = async (userId) => {
    const weekInMs = 1000 * 60 * 60 * 24 * 7;
    const notificationRefs = await admin.database().ref(`users/${userId}/notifications`)
        .orderByChild('seen')
        .equalTo(true)
        .once('value');
    const notifications = [];
    notificationRefs.forEach((child) => {
        const notification = { ...child.val(), id: child.key };
        notifications.push(notification);
    });
    return notifications
        .filter((n) => n.dates.createdAt < (Date.now() - weekInMs))
        .map((n) => n.id);
};
const deleteOlderNotifications = async () => {
    const userIds = await users_1.getAllUserIds();
    const data = await Promise.all(userIds.map(async (userId) => {
        const notifications = await getOldNotifications(userId);
        return notifications.map((id) => `${userId}/notifications/${id}`);
    }));
    const allNotifications = data
        .reduce((acc, cur) => {
        acc.push(...cur);
        return acc;
    }, [])
        .reduce((acc, cur) => {
        acc[cur] = null;
        return acc;
    }, {});
    await admin.database().ref('users').update(allNotifications);
};
exports.deleteOlderNotifications = deleteOlderNotifications;
//# sourceMappingURL=notifications.js.map