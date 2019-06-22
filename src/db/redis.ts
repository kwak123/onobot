import bluebird from "bluebird";
import redis from "redis";

const asyncRedis = bluebird.promisifyAll(redis);

/**
 * Simple shim to support bluebird promisifying all of redis
 */
export interface IAsyncRedisClient {
  [x: string]: any;
}
const client = asyncRedis.createClient({
  db: process.env.NODE_ENV === "test" ? 10 : 0,
}) as IAsyncRedisClient;

// Disable for event logging
/* tslint:disable no-console */
client.on("connect", () => console.log("connecting to redis"));
client.on("ready", () => console.log("connected to redis"));
client.on("error", (error: Error) => console.error("redis error", error));
client.on("warning", (warning: any) => console.warn("redis warning", warning));
/* tslint:enable no-console */

export default {
  asyncRedis,
  client,
  hey: "test",
};
