"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSuperAdmin = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const functions_1 = require("../helpers/functions");
exports.makeSuperAdmin = functions.runWith(functions_1.defaultConfig).https.onRequest(async (_, response) => {
    try {
        const user = await admin.auth().getUserByEmail('kevinfizu@gmail.com');
        if (user) {
            await admin.auth().setCustomUserClaims(user.uid, { isAdmin: true });
            await admin.database()
                .ref('profiles')
                .child(user.uid)
                .child('roles/isAdmin')
                .set(true);
            response.json({ message: 'kevinfizu@gmail.com upgraded to admin' }).end();
        }
        else {
            response.status(400).json({ message: 'kevinfizu@gmail.com doesn\'t exist' }).end();
        }
    }
    catch (e) {
        response.status(400).json({ error: e }).end();
    }
});
//# sourceMappingURL=makeSuperAdmin.js.map