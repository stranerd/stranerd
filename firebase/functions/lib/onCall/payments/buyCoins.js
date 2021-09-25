"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyCoins = void 0;
const functions = require("firebase-functions");
const transactions_1 = require("../../helpers/modules/payments/transactions");
const notifications_1 = require("../../helpers/modules/users/notifications");
const functions_1 = require("../../helpers/functions");
exports.buyCoins = functions.runWith(functions_1.defaultConfig).https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can buy coins');
    const { amount, isGold } = data;
    const userId = context.auth.uid;
    try {
        await transactions_1.addUserCoins(userId, { bronze: isGold ? 0 : amount, gold: isGold ? amount : 0 }, 'You purchased coins', true);
        await notifications_1.createNotification(userId, {
            body: `You just purchased ${amount} coins.`,
            action: '/account/e-wallet'
        });
    }
    catch (error) {
        throw new functions.https.HttpsError('unknown', error.message);
    }
});
//# sourceMappingURL=buyCoins.js.map