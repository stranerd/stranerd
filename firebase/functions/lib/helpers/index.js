"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomValue = exports.getChatsPath = exports.PATH_SEPARATOR = void 0;
exports.PATH_SEPARATOR = '---';
const getChatsPath = (path) => [...path].sort().join(exports.PATH_SEPARATOR);
exports.getChatsPath = getChatsPath;
const getRandomValue = () => Date.now() + Math.random().toString(36).substr(2);
exports.getRandomValue = getRandomValue;
//# sourceMappingURL=index.js.map