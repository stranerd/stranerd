"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorApplicationDeleted = exports.tutorApplicationCreated = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const storage_1 = require("../../helpers/storage");
exports.tutorApplicationCreated = functions.firestore.document('tutorApplications/{id}')
    .onCreate(async (snap) => {
    const { userId } = snap.data();
    await admin.database().ref('profiles').child(userId)
        .child('meta/tutorApplications').child(snap.id)
        .set(true);
});
exports.tutorApplicationDeleted = functions.firestore.document('tutorApplications/{id}')
    .onDelete(async (snap) => {
    var _a;
    const { userId } = snap.data();
    await admin.database().ref('profiles').child(userId)
        .child('meta/tutorApplications').child(snap.id)
        .set(null);
    await storage_1.deleteFromStorage((_a = snap.data().proof) === null || _a === void 0 ? void 0 : _a.path);
});
//# sourceMappingURL=tutorApplications.js.map