import * as redis from "redis";
import * as util from "util";
import { RedisConfig } from "../config/env";

export interface AsyncRedisClient extends redis.RedisClient {
  getAsync(key: string): Promise<string | null>;
  setAsync(key: string, value: string): Promise<unknown>;
  delAsync(key: string): Promise<number>;
  scanAsync(curson: string, match: string, pattern: string): Promise<unknown>;
}

export interface ILSRedisClient {
  setResetToken(userId: number, hashKey: string);
  setJWTToken: (
    userId: number,
    userToken: string,
    jwtToken: string,
    fcmToken: string,
    role: string
  ) => Promise<void>;
  setValue: (key: string, value: string) => Promise<unknown>;
  getValue: (key: string | undefined) => Promise<string | null>;
  deleteKey: (key: string | number | undefined) => Promise<number>;
}

export class LSRedisClient implements ILSRedisClient {
  private readonly redClient: AsyncRedisClient;
  private readonly redClientDB3: AsyncRedisClient;
  private config: RedisConfig;

  constructor(config: RedisConfig) {
    this.config = config;

    this.redClient = redis.createClient(config.port, {
      host: config.host,
      password: config.password,
      db: config.redisDBIndex,
    }) as AsyncRedisClient;

    this.redClientDB3 = redis.createClient(config.port, {
      host: config.host,
      password: config.password,
      db: config.redisCacheIndex,
    }) as AsyncRedisClient;

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
  async connectRedis(): Promise<AsyncRedisClient> {
    return new Promise((resolve, reject) => {
      this.redClient.select(this.config.redisDBIndex, (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.redClient);
        }
      });
    });
  }
  /**
   * To connect redis
   * @returns - redis client
   */
  async connectRedisDB3(): Promise<AsyncRedisClient> {
    return new Promise((resolve, reject) => {
      this.redClientDB3.select(
        this.config.redisCacheIndex,
        (err: Error | null) => {
          if (err) {
            reject(err);
          } else {
            resolve(this.redClientDB3);
          }
        }
      );
    });
  }
  /**
   * To set the value in the redis client
   * @param key - key name of the data to store redis
   * @param value - value of the data to store redis
   */
  async setValue(key: string, value: string): Promise<unknown> {
    return this.redClient.setAsync(key, value);
  }

  /**
   * To remove the value in the redis based on pattern
   * @param pattern - patterm of the data to delete
   */
  async removeKeys(pattern: string): Promise<void> {
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
  async getValue(key: string | undefined): Promise<string | null> {
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
  async deleteKey(key: string | number | undefined): Promise<number> {
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
  async deleteKeys(keys: string[] | number[]): Promise<void> {
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
  async setJWTToken(
    userId: number,
    userToken: string,
    jwtToken: string,
    fcmToken: string,
    role: string
  ): Promise<void> {
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
  async setResetToken(userId: number, userToken: string): Promise<void> {
    const key = userToken;
    const value = { id: userId };
    const cacheToken = JSON.stringify(value);
    await this.setValue(key, cacheToken);
  }
}
