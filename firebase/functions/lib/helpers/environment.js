"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logo = exports.domain = exports.firebase = exports.email = exports.EMAILS = exports.mailchimp = exports.algolia = exports.stripe = exports.isProduction = exports.isStaging = exports.isDev = exports.appName = void 0;
const functions = require("firebase-functions");
const environment = () => { var _a; return (_a = functions.config().env) !== null && _a !== void 0 ? _a : {}; };
exports.appName = (_a = environment()) === null || _a === void 0 ? void 0 : _a.app_name;
const isDev = () => { var _a; return ((_a = environment()) === null || _a === void 0 ? void 0 : _a.environment) === 'development'; };
exports.isDev = isDev;
const isStaging = () => { var _a; return ((_a = environment()) === null || _a === void 0 ? void 0 : _a.environment) === 'staging'; };
exports.isStaging = isStaging;
const isProduction = () => { var _a; return ((_a = environment()) === null || _a === void 0 ? void 0 : _a.environment) === 'release'; };
exports.isProduction = isProduction;
const stripe = () => {
    var _a, _b, _c, _d;
    return ({
        secretKey: (_b = (_a = environment()) === null || _a === void 0 ? void 0 : _a.stripe) === null || _b === void 0 ? void 0 : _b.secret_key,
        publicKey: (_d = (_c = environment()) === null || _c === void 0 ? void 0 : _c.stripe) === null || _d === void 0 ? void 0 : _d.public_key
    });
};
exports.stripe = stripe;
const algolia = () => {
    var _a, _b, _c, _d;
    return ({
        appId: (_b = (_a = environment()) === null || _a === void 0 ? void 0 : _a.algolia) === null || _b === void 0 ? void 0 : _b.app_id,
        apiKey: (_d = (_c = environment()) === null || _c === void 0 ? void 0 : _c.algolia) === null || _d === void 0 ? void 0 : _d.admin_api_key
    });
};
exports.algolia = algolia;
const mailchimp = () => {
    var _a, _b, _c, _d, _e, _f;
    return ({
        apiKey: (_b = (_a = environment()) === null || _a === void 0 ? void 0 : _a.mailchimp) === null || _b === void 0 ? void 0 : _b.api_key,
        audienceId: (_d = (_c = environment()) === null || _c === void 0 ? void 0 : _c.mailchimp) === null || _d === void 0 ? void 0 : _d.audience_id,
        dataCenter: (_f = (_e = environment()) === null || _e === void 0 ? void 0 : _e.mailchimp) === null || _f === void 0 ? void 0 : _f.data_center
    });
};
exports.mailchimp = mailchimp;
var EMAILS;
(function (EMAILS) {
    EMAILS["NO_REPLY"] = "no-reply@stranerd.com";
})(EMAILS = exports.EMAILS || (exports.EMAILS = {}));
const email = () => Object.fromEntries(Object.entries(EMAILS).map(([key, value]) => {
    var _a, _b, _c, _d, _e, _f;
    return [value, {
            privateKey: (_c = (_b = (_a = environment()) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b[key.toLowerCase()]) === null || _c === void 0 ? void 0 : _c.private_key,
            clientId: (_f = (_e = (_d = environment()) === null || _d === void 0 ? void 0 : _d.email) === null || _e === void 0 ? void 0 : _e[key.toLowerCase()]) === null || _f === void 0 ? void 0 : _f.client_id
        }];
}));
exports.email = email;
const firebase = () => {
    var _a, _b, _c, _d, _e, _f;
    return ({
        projectId: (_b = (_a = environment()) === null || _a === void 0 ? void 0 : _a.firebase_client_config) === null || _b === void 0 ? void 0 : _b.project_id,
        location: (_d = (_c = environment()) === null || _c === void 0 ? void 0 : _c.firebase_meta) === null || _d === void 0 ? void 0 : _d.loc_long,
        taskEmail: (_f = (_e = environment()) === null || _e === void 0 ? void 0 : _e.firebase_meta) === null || _f === void 0 ? void 0 : _f.task_email
    });
};
exports.firebase = firebase;
const domain = () => { var _a; return `http${!exports.isDev() ? 's' : ''}://${(_a = environment()) === null || _a === void 0 ? void 0 : _a.domain}${exports.isDev() ? `:${environment().port}` : ''}`; };
exports.domain = domain;
const logo = () => `${exports.domain()}/images/logo-white.png`;
exports.logo = logo;
//# sourceMappingURL=environment.js.map