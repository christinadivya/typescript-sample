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
exports.LSRedisClient = void 0;
const redis = __importStar(require("redis"));
const util = __importStar(require("util"));
class LSRedisClient {
    redClient;
    redClientDB3;
    config;
    constructor(config) {
        this.config = config;
        this.redClient = redis.createClient(config.port, {
            host: config.host,
            password: config.password,
            db: config.redisDBIndex,
        });
        this.redClientDB3 = redis.createClient(config.port, {
            host: config.host,
            password: config.password,
            db: config.redisCacheIndex,
        });
        this.redClient.getAsync = util
            .promisify(this.redClient.get)
            .bind(this.redClient);
        this.redClient.setAsync = util
            .promisify(this.redClient.set)
            .bind(this.redClient);
        this.redClient.delAsync = util
            .promisify(this.redClient.del)
            .bind(this.redClient);
        this.redClientDB3.scanAsync = util
            .promisify(this.redClientDB3.scan)
            .bind(this.redClientDB3);
    }
    /**
     * To connect redis
     * @returns - redis client
     */
    async connectRedis() {
        return new Promise((resolve, reject) => {
            this.redClient.select(this.config.redisDBIndex, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.redClient);
                }
            });
        });
    }
    /**
     * To connect redis
     * @returns - redis client
     */
    async connectRedisDB3() {
        return new Promise((resolve, reject) => {
            this.redClientDB3.select(this.config.redisCacheIndex, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.redClientDB3);
                }
            });
        });
    }
    /**
     * To set the value in the redis client
     * @param key - key name of the data to store redis
     * @param value - value of the data to store redis
     */
    async setValue(key, value) {
        return this.redClient.setAsync(key, value);
    }
    /**
     * To remove the value in the redis based on pattern
     * @param pattern - patterm of the data to delete
     */
    async removeKeys(pattern) {
        const cursor = "0";
        // eslint-disable-next-line no-await-in-loop
        await this.redClientDB3
            .scanAsync(cursor, "MATCH", `${pattern}`)
            .then((data) => {
            data[1].forEach((keys) => {
                this.redClientDB3.unlink(keys);
            });
        });
    }
    /**
     * To get the value
     * @param key - key to be stored
     * @returns - redis client key
     */
    async getValue(key) {
        if (!key) {
            return null;
        }
        return this.redClient.getAsync(key);
    }
    /**
     * To delete the key value
     * @param key - - key to be stored
     * @returns - redis client key
     */
    async deleteKey(key) {
        if (!key) {
            return -1;
        }
        return this.redClient.delAsync(key.toString());
    }
    /**
     * To delete the key value
     * @param key - - key to be stored
     * @returns - redis client key
     */
    async deleteKeys(keys) {
        keys.forEach((key) => {
            this.redClient.delAsync(key.toString());
        });
    }
    /**
     * This function is used to set user authentication token in redis db
     * @param userId - id of the user
     * @param userToken - hash key
     * @param jwtToken - jwt token
     * @param fcmToken - fcm token
     * @param role - role of the user
     */
    async setJWTToken(userId, userToken, jwtToken, fcmToken, role) {
        const key = userToken;
        const value = { jwtToken, id: userId, token: fcmToken, role };
        const cacheToken = JSON.stringify(value);
        await this.setValue(key, cacheToken);
        await this.setValue(jwtToken, String(userId));
    }
    /**
     * This function is used to reset user authentication token in redis db
     * @param userId - id of the user
     * @param userToken - hashkey
     */
    async setResetToken(userId, userToken) {
        const key = userToken;
        const value = { id: userId };
        const cacheToken = JSON.stringify(value);
        await this.setValue(key, cacheToken);
    }
}
exports.LSRedisClient = LSRedisClient;
//# sourceMappingURL=redis.js.map