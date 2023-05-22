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
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const envConfig = __importStar(require("./config/env"));
const { connection, host, port, username, password, synchronize, logging, database, } = envConfig.getConfig().db;
const { port: redisPort, host: redisHost, password: redisPassword, } = envConfig.getConfig().redisDb;
const options = {
    type: connection,
    host,
    port,
    username,
    password,
    database,
    synchronize,
    logging,
    cache: {
        type: "ioredis",
        options: {
            host: redisHost,
            port: redisPort,
            password: redisPassword,
            db: 3,
            maxRetriesPerRequest: 2,
        },
        duration: 25000,
        ignoreErrors: true,
    },
    timezone: "Z",
    charset: "utf8mb4_general_ci",
    entities: [`${__dirname}/entity/*.ts`, `${__dirname}/entity/*.js`],
    migrations: [`${__dirname}/database/migration/*.ts`],
    seeds: [`${__dirname}/database/seed/*.ts`],
};
// eslint-disable-next-line import/prefer-default-export
exports.appDataSource = new typeorm_1.DataSource(options);
//# sourceMappingURL=data-source.js.map