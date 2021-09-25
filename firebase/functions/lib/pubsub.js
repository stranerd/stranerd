"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runQuarterly = exports.runMonthly = exports.runWeekly = exports.runDaily = void 0;
const functions = require("firebase-functions");
const auth_1 = require("./auth");
const notifications_1 = require("./helpers/modules/users/notifications");
const functions_1 = require("./helpers/functions");
const DAILY_CRONTAB_SYNTAX = '0 0 * * *';
const WEEKLY_CRONTAB_SYNTAX = '0 0 * * 0';
const MONTHLY_CRONTAB_SYNTAX = '0 0 1 * *';
const QUARTERLY_CRONTAB_SYNTAX = '0 0 1 */3 *';
exports.runDaily = functions.runWith(functions_1.defaultConfig).pubsub.schedule(DAILY_CRONTAB_SYNTAX).onRun(async () => {
    await auth_1.deleteUnVerifiedUsers();
});
exports.runWeekly = functions.runWith(functions_1.defaultConfig).pubsub.schedule(WEEKLY_CRONTAB_SYNTAX).onRun(async () => {
    await notifications_1.deleteOlderNotifications();
});
exports.runMonthly = functions.runWith(functions_1.defaultConfig).pubsub.schedule(MONTHLY_CRONTAB_SYNTAX).onRun(async () => { });
exports.runQuarterly = functions.pubsub.schedule(QUARTERLY_CRONTAB_SYNTAX).onRun(async () => { });
//# sourceMappingURL=pubsub.js.map