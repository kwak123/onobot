const redis = require('./redis');

const USER_IDS_HASH = 'user_ids';

const addUser = ({ userId, userName }) => redis.hmsetAsync(
  userId,
  'name', userName,
  'karma', 0,
  'birthday', '',
);

const getUser = ({ userId }) => redis.hgetallAsync(userId);

const setKarma = ({ userId, karmaUp = true }) => getUser({ userId })
  .then((result) => {
    let karma = parseInt(result.karma, 10);
    if (karmaUp) {
      karma += 1;
    }
    else {
      karma -= 1;
    }
    return redis.hsetAsync(userId, 'karma', karma)
      .then(() => getUser({ userId }));
  });

const setUserNamesTable = ({ members }) => {
  const pluckedMemberDetailsArray = members.map(({ id, name }) => ({ id, name }));
  const promisifiedMemberDetailsArray = pluckedMemberDetailsArray
    .map(({ id, name }) => redis.hsetAsync(USER_IDS_HASH, id, name));
  return Promise.all(promisifiedMemberDetailsArray);
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
  setUserNamesTable,
};
