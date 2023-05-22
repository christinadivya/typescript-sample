"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const config_1 = __importDefault(require("./config"));
log4js_1.default.configure(config_1.default);
exports.default = log4js_1.default.getLogger("app");
//# sourceMappingURL=Logger.js.map