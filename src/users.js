const redis = require('./db/redis');

const USER_SET = 'usernames';

const addUser = ({ userName }) => redis.saddAsync(USER_SET, userName);

module.exports = {
  CONSTANTS: {
    USER_SET,
  },
  addUser,
};
