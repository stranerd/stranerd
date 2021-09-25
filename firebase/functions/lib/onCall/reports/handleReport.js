"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReport = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const functions_1 = require("../../helpers/functions");
const WARNING_COUNT = 3;
const SUSPEND_COUNT = 3;
exports.handleReport = functions.runWith(functions_1.defaultConfig).https.onCall(async (data, context) => {
    var _a;
    if (!context.auth || !context.auth.token.isAdmin)
        throw new functions.https.HttpsError('unauthenticated', 'Only admins can handle reports');
    const { id = '', key = '', userId = '' } = data;
    // TODO: Confirm if stats are shared between keys or separated
    const reportRef = await admin.database().ref('profiles').child(userId).child('reports').child(key);
    const { warning = 0, suspend = 0 } = (_a = (await reportRef.once('value')).val()) !== null && _a !== void 0 ? _a : {};
    const takeMeasure = (warning, suspend) => {
        if (warning + 1 <= WARNING_COUNT)
            return warnUser;
        if (suspend + 1 <= SUSPEND_COUNT)
            return suspendUser;
        return deleteUser;
    };
    await takeMeasure(warning, suspend)();
    const warnUser = async () => {
        // TODO: send notification warning
        await admin.database().ref().update({
            [`profiles/${userId}/reports/${key}/warning`]: admin.database.ServerValue.increment(1),
            [`reports/${key}/${id}`]: null
        });
    };
    const suspendUser = async () => {
        // TODO: set suspension action
        await admin.database().ref().update({
            [`profiles/${userId}/reports/${key}/warning`]: 0,
            [`profiles/${userId}/reports/${key}/suspend`]: admin.database.ServerValue.increment(1),
            [`reports/${key}/${id}`]: null
        });
    };
    const deleteUser = async () => {
        // TODO: delete user account
        await admin.database().ref().update({
            [`profiles/${userId}/reports/${key}/warning`]: 0,
            [`profiles/${userId}/reports/${key}/suspend`]: 0,
            [`reports/${key}/${id}`]: null
        });
    };
});
//# sourceMappingURL=handleReport.js.map