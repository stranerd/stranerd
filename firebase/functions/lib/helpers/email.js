"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewFormReportEmail = exports.sendNewFormMessageEmail = exports.sendNewNotificationEmail = exports.sendMailAndCatchErrors = exports.sendMail = void 0;
const admin = require("firebase-admin");
const nodemailer_1 = require("nodemailer");
const Template = require("email-templates");
const environment_1 = require("./environment");
const sendMail = async (to, subject, content, from = environment_1.EMAILS.NO_REPLY) => {
    const { clientId, privateKey } = environment_1.email()[from];
    const transporter = nodemailer_1.createTransport({
        service: 'gmail',
        auth: { type: 'OAuth2', user: from, serviceClient: clientId, privateKey },
        tls: { rejectUnauthorized: false }
    });
    await transporter.verify();
    await transporter.sendMail({
        from: environment_1.appName,
        to, subject,
        html: content
    });
};
exports.sendMail = sendMail;
const sendMailAndCatchErrors = async (to, subject, content, from = environment_1.EMAILS.NO_REPLY) => {
    try {
        await exports.sendMail(to, subject, content, from);
        return true;
    }
    catch (e) {
        await admin.database().ref('errors/emails').push({
            error: e.message,
            subject, to, content, from,
            dates: { triedAt: admin.database.ServerValue.TIMESTAMP }
        });
        return false;
    }
};
exports.sendMailAndCatchErrors = sendMailAndCatchErrors;
const sendNewNotificationEmail = async (to, notification) => {
    const meta = { domain: environment_1.domain(), logo: environment_1.logo() };
    const content = await new Template({ message: {} }).render('newNotification.pug', { notification, meta });
    return await exports.sendMailAndCatchErrors(to, notification.title, content, environment_1.EMAILS.NO_REPLY);
};
exports.sendNewNotificationEmail = sendNewNotificationEmail;
const sendNewFormMessageEmail = async (message) => {
    const meta = { domain: environment_1.domain(), logo: environment_1.logo() };
    const content = await new Template({ message: {} }).render('newFormMessage.pug', { meta, message });
    return await exports.sendMailAndCatchErrors('support@stranerd.com', 'New Message', content);
};
exports.sendNewFormMessageEmail = sendNewFormMessageEmail;
const sendNewFormReportEmail = async (report) => {
    const meta = { domain: environment_1.domain(), logo: environment_1.logo() };
    const content = await new Template({ message: {} }).render('newFormReport.pug', { meta, report });
    return await exports.sendMailAndCatchErrors('support@stranerd.com', 'New Report', content);
};
exports.sendNewFormReportEmail = sendNewFormReportEmail;
//# sourceMappingURL=email.js.map