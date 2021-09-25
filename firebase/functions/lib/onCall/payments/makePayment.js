"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStripePayment = void 0;
const functions = require("firebase-functions");
const stripe = require("../../helpers/stripe");
const functions_1 = require("../../helpers/functions");
exports.makeStripePayment = functions.runWith(functions_1.defaultConfig).https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can make payments');
    const { amount, currency } = data;
    try {
        const result = await stripe.makePayment(amount, currency);
        return result.client_secret;
    }
    catch (error) {
        throw new functions.https.HttpsError('unknown', error.message);
    }
});
//# sourceMappingURL=makePayment.js.map