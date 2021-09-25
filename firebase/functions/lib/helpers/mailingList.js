"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToMailchimpList = void 0;
const axios_1 = require("axios");
const environment_1 = require("./environment");
const subscribeToMailchimpList = async (email) => {
    const body = {
        members: [
            { email_address: email, status: 'subscribed' }
        ]
    };
    const bodyJSON = JSON.stringify(body);
    const { audienceId, apiKey, dataCenter } = environment_1.mailchimp();
    const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}`;
    try {
        await axios_1.default.post(url, bodyJSON, { headers: { Authorization: `auth ${apiKey}` } });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.subscribeToMailchimpList = subscribeToMailchimpList;
//# sourceMappingURL=mailingList.js.map