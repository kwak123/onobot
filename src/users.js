const redis = require('./db/redis');

const USER_IDS_HASH = 'user_ids';

const addUser = ({ userName }) => redis.hmsetAsync(
  userName,
  'karma', 0,
  'birthday', '',
);

const getUser = ({ userName }) => redis.hgetallAsync(userName);

const getOrAddUser = ({ userName }) => getUser({ userName })
  .then((result) => {
    if (!result) {
      return addUser({ userName }).then(() => getUser({ userName }));
    }
    return result;
  });

const setKarma = ({ userName, karmaUp = true }) => getOrAddUser({ userName })
  .then((result) => {
    let karma = parseInt(result.karma, 10);
    if (karmaUp) {
      karma += 1;
    }
    else {
      karma -= 1;
    }
    return redis.hsetAsync(userName, 'karma', karma)
      .then(() => getUser({ userName }));
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
  getOrAddUser,
  getUserName,
  setKarma,
  setUserNamesTable,
};
