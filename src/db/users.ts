import redis from "./redis";

const { client } = redis;

export interface IUser {
  userId: string;
  userName?: string;
}

const addUser = ({ userId, userName }: IUser) =>
  client.hmsetAsync(userId, "name", userName, "karma", 0, "birthday", "");

const getUser = ({ userId }: IUser) => client.hgetallAsync(userId);

const setKarma = ({ userId, newKarma }: { userId: string; newKarma: number }) =>
  client.hsetAsync(userId, "karma", newKarma).then(() => newKarma);

export default {
  addUser,
  getUser,
  setKarma,
};
