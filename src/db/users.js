const redis = require('./redis');

const addUser = ({ userId, userName }) => redis.hmsetAsync(
  userId,
  'name', userName,
  'karma', 0,
  'birthday', '',
);

const getUser = ({ userId }) => redis.hgetallAsync(userId);

const setKarma = ({ userId, oldKarma, karmaUp = true }) => {
  let newKarma = parseInt(oldKarma, 10);

  if (karmaUp) {
    newKarma += 1;
  }
  else {
    newKarma -= 1;
  }

  return redis.hsetAsync(userId, 'karma', newKarma)
    .then(() => newKarma);
};

module.exports = {
  addUser,
  getUser,
  setKarma,
};
