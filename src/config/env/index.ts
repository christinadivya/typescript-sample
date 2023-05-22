// eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
require("dotenv").config();

export type DB_TYPE = "mysql" | "postgres" | "sqlite";

export type RedisConfig = {
  port: string;
  host: string;
  password: string;
  redisDBIndex: number;
  redisCacheIndex: number;
};

export type DbConfig = {
  username: string;
  password: string;
  database: string;
  connection: "mysql" | "postgres" | "sqlite";
  logging: boolean;
  synchronize: boolean;
  host?: string;
  port?: number;
  storage?: string;
};

export type ApiUrl = {
  apiUrl: string;
};

export type Sentry = {
  dsn: string;
};

export type FCMKey = string;

export type ApiBasicAuth = {
  user: string;
  password: string;
};

export type ENVConfig = {
  appPort: string;
  hostIP: string;
  hostName: string;
  redisDb: RedisConfig;
  db: DbConfig;
  jwtKey: string;
  apiUrl: ApiUrl;
  sentry: Sentry;
  env: string;
  webUrl: string;
  encryptionKey: string;
  communicationMicroServiceUrl: string;
  basicAuth: ApiBasicAuth;
  prometheusAppName: string;
};
/**
 *This function is used to get the value for env variables
 * @param key - This function is used to throw Error
 * @returns - value for the given key
 */
function envOrThrow(key: string): string {
  const val = process.env[key];
  if (!val) {
    throw new Error(`Required environment variable ${key} not set`);
  }

  return val;
}

// TODO: Get rid of the static and getConfigOrNull. This helps for getting rid of module side effects for now
// eslint-disable-next-line import/no-mutable-exports
let config: ENVConfig | null = null;
/**
 * @returns This function is used to get ENVConfig if available
 */
export function getConfigOrNull(): ENVConfig | null {
  return config;
}
/**
 *
 * @returns This function is used to set env variables based on node environment (production or staging or development)
 */
export function getConfig(): ENVConfig {
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
      connection: envOrThrow("APP_DB_CONNECTION") as DB_TYPE,
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
