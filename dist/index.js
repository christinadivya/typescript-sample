"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// organize-imports-ignore
require("reflect-metadata");
const data_source_1 = require("./data-source");
const envConfig = __importStar(require("./config/env"));
const Logger_1 = __importDefault(require("./config/logger/Logger"));
const routes_1 = __importDefault(require("./routes"));
async function runServer() {
    try {
        const config = envConfig.getConfig();
        await data_source_1.appDataSource.initialize();
        Logger_1.default.info("Database connected");
        return (0, routes_1.default)(config);
    }
    catch (e) {
        Logger_1.default.error(e, "Unable to start the server!");
        return e;
    }
}
exports.default = runServer;
// TODO(JEM): Could now use this to spin up the server in-process during tests if desired
runServer().catch((err) => {
    Logger_1.default.error(`Top-level catch: ${err}`);
});
//# sourceMappingURL=index.js.map