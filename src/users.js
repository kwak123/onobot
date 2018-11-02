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

module.exports = {
  addUser,
  getUser,
  getOrAddUser,
};
