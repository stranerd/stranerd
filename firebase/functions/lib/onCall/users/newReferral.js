"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newReferral = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const transactions_1 = require("../../helpers/modules/payments/transactions");
const notifications_1 = require("../../helpers/modules/users/notifications");
const functions_1 = require("../../helpers/functions");
exports.newReferral = functions.runWith(functions_1.defaultConfig).https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can save new referrals');
    try {
        const { referrerId, email, userId } = data;
        await transactions_1.addUserCoins(referrerId, { gold: 1, bronze: 20 }, 'Someone signed up with your referral link');
        await notifications_1.createNotification(referrerId, {
            title: 'New Referral Signup',
            body: `A new user with the email: ${email} just signed up with your referral link. Checkout his/her profile`,
            action: `/users/${userId}`
        });
        await admin.database().ref('profiles').child(referrerId).child('account/referrals').child(userId).set(true);
    }
    catch (e) {
        throw new functions.https.HttpsError('unknown', 'Error saving new referral');
    }
});
//# sourceMappingURL=newReferral.js.map