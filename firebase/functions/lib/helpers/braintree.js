"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNotification = exports.cancelSubscription = exports.updatePaymentMethodForSubscription = exports.subscribeToPlan = exports.makePayment = exports.removePaymentMethod = exports.createPaymentMethod = exports.getClientToken = exports.updateCustomerName = exports.createCustomer = void 0;
const braintree_1 = require("braintree");
const environment_1 = require("./environment");
const getGateway = () => {
    const { merchantId, privateKey, publicKey } = environment_1.braintree();
    return new braintree_1.BraintreeGateway({
        environment: braintree_1.Environment[environment_1.isProduction() ? 'Production' : 'Sandbox'],
        merchantId, publicKey, privateKey
    });
};
const createCustomer = async (name, email) => await getGateway().customer
    .create({ firstName: name, email });
exports.createCustomer = createCustomer;
const updateCustomerName = async (customerId, name) => await getGateway().customer
    .update(customerId, { firstName: name });
exports.updateCustomerName = updateCustomerName;
const getClientToken = async () => await getGateway().clientToken.generate({});
exports.getClientToken = getClientToken;
const createPaymentMethod = async (customerId, paymentMethodNonce) => await getGateway().paymentMethod
    .create({ customerId, paymentMethodNonce });
exports.createPaymentMethod = createPaymentMethod;
const removePaymentMethod = async (token) => await getGateway().paymentMethod.delete(token);
exports.removePaymentMethod = removePaymentMethod;
const makePayment = async (amount, paymentMethodNonce) => getGateway().transaction
    .sale({ amount: amount.toString(), paymentMethodNonce });
exports.makePayment = makePayment;
const subscribeToPlan = async (planId, paymentMethodToken) => await getGateway().subscription.create({
    planId, paymentMethodToken
});
exports.subscribeToPlan = subscribeToPlan;
const updatePaymentMethodForSubscription = async (id, paymentMethodToken) => await getGateway().subscription
    // @ts-ignore TODO: FIx PlanID Issue
    .update(id, { paymentMethodToken });
exports.updatePaymentMethodForSubscription = updatePaymentMethodForSubscription;
const cancelSubscription = async (id) => await getGateway().subscription.cancel(id);
exports.cancelSubscription = cancelSubscription;
const parseNotification = async ({ bt_signature, bt_payload }) => await getGateway()
    .webhookNotification.parse(bt_signature, bt_payload);
exports.parseNotification = parseNotification;
//# sourceMappingURL=braintree.js.map