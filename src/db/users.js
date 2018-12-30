const redis = require('./redis');

const USER_IDS_HASH = 'user_ids';

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

const getUserName = ({ userName }) => {
  const id = userName; // Variable rename is due
  return redis.hgetAsync(USER_IDS_HASH, id);
};

module.exports = {
  addUser,
  getUser,
  getUserName,
  setKarma,
};
