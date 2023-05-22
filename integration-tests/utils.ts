import * as envConfig from "../src/config/env";
import { LSRedisClient } from "../src/redis/redis";

const config = envConfig.getConfig();

export function getHost(type = "base"): string {
  if (type === "base") {
    return config.apiUrl.baseURL;
  }

  return config.apiUrl.apiUrl;
}

export async function setupEnvironment() {
  // Set appropriate redis keys:
  const redisClient = new LSRedisClient(config.redisDb);
  await redisClient.connectRedis();

  // await redisClient.setValue(
  //   'da8cf5b78f10b8a80aa10758ac43e80c84c93e01',
  //   '{"jwtToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOjIsImlhdCI6MTYwOTgyNDU5NH0.eHZkjclFxKzWsbuHzPfW6EwSiL91_tNz1NC9dBlhxQc","id":10}',
  // );
  // await redisClient.setValue(
  //   '10',
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOjIsImlhdCI6MTYwOTgyNDU5NH0.eHZkjclFxKzWsbuHzPfW6EwSiL91_tNz1NC9dBlhxQc',
  // );
  // await redisClient.setValue(
  //   '2dfd82614a96055acdde987e478ce793041162c0',
  //   '{"jwtToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInJvbGUiOjEsImlhdCI6MTYwOTgyNzI0OH0.F2-KWo42t_nsTHzoRGVNgF9_QqmbixvmNuk0CWmcRHE","id":27}',
  // );
  // await redisClient.setValue(
  //   '27',
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInJvbGUiOjEsImlhdCI6MTYwOTgyNzI0OH0.F2-KWo42t_nsTHzoRGVNgF9_QqmbixvmNuk0CWmcRHE',
  // );
}
