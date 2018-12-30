const redis = require('./redis');

const addUser = ({ userId, userName }) => redis.hmsetAsync(
  userId,
  'name', userName,
  'karma', 0,
  'birthday', '',
);

const getUser = ({ userId }) => redis.hgetallAsync(userId);

const setKarma = ({ userId, newKarma }) => redis.hsetAsync(userId, 'karma', newKarma)
  .then(() => newKarma);

module.exports = {
  addUser,
  getUser,
  setKarma,
};
