const redis = require('./db/redis');

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

module.exports = {
  addUser,
  getUser,
  getOrAddUser,
  setKarma,
};
