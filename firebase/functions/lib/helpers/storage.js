"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromStorage = void 0;
const admin = require("firebase-admin");
const deleteFromStorage = async (path) => {
    try {
        if (!path)
            return;
        const file = admin.storage().bucket().file(path);
        const exists = (await file.exists())[0];
        if (exists)
            await file.delete();
    }
    catch (error) {
        console.warn(`Failed to delete file at ${path}`);
    }
};
exports.deleteFromStorage = deleteFromStorage;
//# sourceMappingURL=storage.js.map