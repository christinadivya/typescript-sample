import { ENVConfig } from "../src/config/env";

const envConfig: ENVConfig = {
  appPort: "",
  hostIP: "",
  hostName: "",
  redisDb: {
    port: "",
    host: "",
    password: "",
    redisDBIndex: 0,
    redisCacheIndex: 3,
  },
  db: {
    username: "",
    password: "",
    database: "",
    connection: "mysql",
    logging: false,
    synchronize: false,
    host: "",
    port: 0,
    storage: "",
  },
  jwtKey: "",
  apiUrl: {
    apiUrl: "",
  },
  sentry: {
    dsn: "",
  },
  env: "",
  basicAuth: {
    user: "",
    password: "",
  },
  webUrl: "",
  encryptionKey: "",
  communicationMicroServiceUrl: "",
  prometheusAppName: "",
};

export default envConfig;
