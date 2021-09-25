"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectDeleted = exports.subjectIconUpdated = void 0;
const functions = require("firebase-functions");
const storage_1 = require("../../helpers/storage");
exports.subjectIconUpdated = functions.database.ref('subjects/{subjectId}/icon')
    .onUpdate(async (snap) => {
    var _a;
    await storage_1.deleteFromStorage((_a = snap.before.val()) === null || _a === void 0 ? void 0 : _a.path);
});
exports.subjectDeleted = functions.database.ref('subjects/{subjectId}')
    .onDelete(async (snap) => {
    var _a;
    await storage_1.deleteFromStorage((_a = snap.val().icon) === null || _a === void 0 ? void 0 : _a.path);
});
//# sourceMappingURL=subjects.js.map