"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserCoins = void 0;
const admin = require("firebase-admin");
const createTransaction = async (userId, data) => {
    try {
        await admin.firestore().collection(`users/${userId}/transactions`)
            .add({
            ...data,
            dates: { createdAt: admin.firestore.FieldValue.serverTimestamp() }
        });
    }
    catch (e) {
        console.log(`Failed to create transaction for: ${userId}.\n${e.message}`);
    }
};
const addUserCoins = async (userId, coins, transactionDetails, bought = false) => {
    var _a, _b, _c, _d;
    const data = {
        'coins/gold': admin.database.ServerValue.increment((_a = coins.gold) !== null && _a !== void 0 ? _a : 0),
        'coins/bronze': admin.database.ServerValue.increment((_b = coins.bronze) !== null && _b !== void 0 ? _b : 0)
    };
    if (bought) {
        data['bought/gold'] = admin.database.ServerValue.increment((_c = coins.gold) !== null && _c !== void 0 ? _c : 0);
        data['bought/bronze'] = admin.database.ServerValue.increment((_d = coins.bronze) !== null && _d !== void 0 ? _d : 0);
    }
    await admin.database().ref('profiles')
        .child(userId)
        .child('account')
        .update(data);
    if (transactionDetails && coins.gold)
        await createTransaction(userId, {
            amount: coins.gold,
            event: transactionDetails,
            isGold: true
        });
    if (transactionDetails && coins.bronze)
        await createTransaction(userId, {
            amount: coins.bronze,
            event: transactionDetails,
            isGold: false
        });
};
exports.addUserCoins = addUserCoins;
//# sourceMappingURL=transactions.js.map