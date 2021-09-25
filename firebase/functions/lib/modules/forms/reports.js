"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportCreated = void 0;
const functions = require("firebase-functions");
const email_1 = require("../../helpers/email");
exports.reportCreated = functions.database.ref('forms/reports/{reportId}')
    .onCreate(async (snap) => {
    const { reportedId, reporterId, reportedBio, reporterBio, title, message, dates: { createdAt } } = snap.val();
    await email_1.sendNewFormReportEmail({
        id: snap.key, reportedId, reporterId, reportedBio, reporterBio, title, message,
        date: new Date(createdAt).toLocaleString()
    });
    await snap.ref.remove();
});
//# sourceMappingURL=reports.js.map