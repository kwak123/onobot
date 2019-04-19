const redis = require('./redis');

export interface User {
  userId: string,
  userName?: string,
};

const addUser = ({ userId, userName }: User) => redis.hmsetAsync(
  userId,
  'name', userName,
  'karma', 0,
  'birthday', '',
);

const getUser = ({ userId }: User) => redis.hgetallAsync(userId);

const setKarma = ({
  userId,
  newKarma,
}: { userId: string, newKarma: number }) => redis.hsetAsync(userId, 'karma', newKarma)
  .then(() => newKarma);

export default {
  addUser,
  getUser,
  setKarma,
};
