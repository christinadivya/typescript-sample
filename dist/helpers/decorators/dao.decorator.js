"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_keys_1 = require("./metadata.keys");
const DAO = (basePath) => {
    return (target) => {
        Reflect.defineMetadata(metadata_keys_1.MetadataKeys.BASE_PATH, basePath, target);
    };
};
exports.default = DAO;
//# sourceMappingURL=dao.decorator.js.map