"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipNerd = void 0;
const functions = require("firebase-functions");
const transactions_1 = require("../../helpers/modules/payments/transactions");
const achievements_1 = require("../../helpers/modules/users/achievements");
const notifications_1 = require("../../helpers/modules/users/notifications");
exports.tipNerd = functions.https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can tip nerds');
    try {
        const { tutorId, amount } = data;
        return await tipTutor(context.auth.uid, tutorId, amount);
    }
    catch (e) {
        throw new functions.https.HttpsError('unknown', 'Error tipping nerd');
    }
});
const tipTutor = async (userId, tutorId, amount) => {
    await transactions_1.addUserCoins(userId, { bronze: 0, gold: 0 - amount }, 'You tipped a nerd coins');
    await transactions_1.addUserCoins(tutorId, { bronze: 0, gold: amount }, 'You were tipped coins');
    await transactions_1.addUserXp(userId, transactions_1.XpGainList.TIP_NERD);
    await achievements_1.Achievement.checkTipNerdsAchievement(userId);
    await notifications_1.createNotification(tutorId, {
        body: `You just got tipped ${amount} coins`,
        action: '/account/e-wallet'
    });
};
//# sourceMappingURL=tipNerd.js.map