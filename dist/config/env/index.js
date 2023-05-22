"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.getConfigOrNull = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
require("dotenv").config();
/**
 *This function is used to get the value for env variables
 * @param key - This function is used to throw Error
 * @returns - value for the given key
 */
function envOrThrow(key) {
    const val = process.env[key];
    if (!val) {
        throw new Error(`Required environment variable ${key} not set`);
    }
    return val;
}
// TODO: Get rid of the static and getConfigOrNull. This helps for getting rid of module side effects for now
// eslint-disable-next-line import/no-mutable-exports
let config = null;
/**
 * @returns This function is used to get ENVConfig if available
 */
function getConfigOrNull() {
    return config;
}
exports.getConfigOrNull = getConfigOrNull;
/**
 *
 * @returns This function is used to set env variables based on node environment (production or staging or development)
 */
function getConfig() {
    if (config) {
        return config;
    }
    config = {
        appPort: envOrThrow("APP_PORT"),
        hostIP: envOrThrow("HOST_IP"),
        hostName: envOrThrow("HOST_NAME"),
        redisDb: {
            port: envOrThrow("REDIS_DB_PORT"),
            host: envOrThrow("REDIS_DB_HOST"),
            password: envOrThrow("REDIS_DB_PASSWORD"),
            redisDBIndex: Number(envOrThrow("REDIS_DB_INDEX")),
            redisCacheIndex: Number(envOrThrow("REDIS_CACHE_INDEX")),
        },
        db: {
            host: envOrThrow("APP_DB_HOST"),
            port: Number(envOrThrow("APP_DB_PORT")),
            username: envOrThrow("APP_DB_USERNAME"),
            password: envOrThrow("APP_DB_PASSWORD"),
            database: envOrThrow("APP_DB_DATABASE"),
            connection: envOrThrow("APP_DB_CONNECTION"),
            logging: envOrThrow("APP_DB_LOGGING") === "true",
            synchronize: envOrThrow("APP_DB_SYNCHRONIZE") === "true",
        },
        jwtKey: envOrThrow("JWT_SECRET_KEY"),
        apiUrl: {
            apiUrl: envOrThrow("API_URL"),
        },
        sentry: { dsn: envOrThrow("SENTRY_DSN") },
        env: envOrThrow("NODE_ENV"),
        webUrl: envOrThrow("WEB_URL"),
        basicAuth: {
            user: envOrThrow("API_BASIC_AUTH_USER"),
            password: envOrThrow("API_BASIC_AUTH_PASSWORD"),
        },
        encryptionKey: envOrThrow("ENCRYPTION_KEY"),
        communicationMicroServiceUrl: envOrThrow("COMMUNICATION_MICRO_SERVICE_URL"),
        prometheusAppName: envOrThrow("PROMETHEUS_APP_NAME"),
    };
    return config;
}
exports.getConfig = getConfig;
//# sourceMappingURL=index.js.map