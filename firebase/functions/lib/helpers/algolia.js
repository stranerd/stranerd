"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromAlgolia = exports.saveToAlgolia = void 0;
const algoliasearch_1 = require("algoliasearch");
const environment_1 = require("./environment");
const saveToAlgolia = async (collection, id, data) => {
    try {
        const { appId, apiKey } = environment_1.algolia();
        await algoliasearch_1.default(appId, apiKey).initIndex(collection).saveObject({ ...data, objectID: id });
    }
    catch (e) {
        console.warn(`Error saving ${id} in collection ${collection} to algolia`);
    }
};
exports.saveToAlgolia = saveToAlgolia;
const deleteFromAlgolia = async (collection, id) => {
    try {
        const { appId, apiKey } = environment_1.algolia();
        await algoliasearch_1.default(appId, apiKey).initIndex(collection).deleteObject(id);
    }
    catch (e) {
        console.warn(`Error deleting ${id} in collection ${collection} from algolia`);
    }
};
exports.deleteFromAlgolia = deleteFromAlgolia;
//# sourceMappingURL=algolia.js.map