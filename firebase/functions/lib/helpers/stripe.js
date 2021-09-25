"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayment = void 0;
const stripe_1 = require("stripe");
const environment_1 = require("./environment");
// The link below gives a clearer implementation on how to implement stripe
// to directly charge a card. Most of the work would be done front end, all that is needed
// here is to create a session
// https://stripe.com/docs/payments/integration-builder
const makePayment = async (amount, currency) => {
    // Create a PaymentIntent with the order amount and currency
    const stripe = new stripe_1.default(environment_1.stripe().secretKey, {
        apiVersion: '2020-08-27'
    });
    const intent = await stripe.paymentIntents.create({
        amount: amount * 100, currency,
        payment_method_types: ['card']
    });
    return intent;
};
exports.makePayment = makePayment;
//# sourceMappingURL=stripe.js.map