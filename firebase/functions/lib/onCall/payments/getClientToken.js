"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientToken = void 0;
const functions = require("firebase-functions");
const environment_1 = require("../../helpers/environment");
const braintree = require("../../helpers/braintree");
exports.getClientToken = functions.https.onCall(async (_, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can make payments');
    try {
        const token = await braintree.getClientToken();
        return {
            braintree: token.clientToken,
            paypal: environment_1.paypal().clientSecret
        };
    }
    catch (error) {
        throw new functions.https.HttpsError('unknown', error.message);
    }
});
//# sourceMappingURL=getClientToken.js.map