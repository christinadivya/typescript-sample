import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import * as envConfig from "./config/env";

const {
  connection,
  host,
  port,
  username,
  password,
  synchronize,
  logging,
  database,
} = envConfig.getConfig().db;

const {
  port: redisPort,
  host: redisHost,
  password: redisPassword,
} = envConfig.getConfig().redisDb;

const options: DataSourceOptions & SeederOptions = {
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
export const appDataSource = new DataSource(options);
