const redis = require('../src/db/redis');
const users = require('../src/users');

const { CONSTANTS } = users;

describe('users', () => {
  beforeEach(() => redis.flushdbAsync());

  afterAll(() => redis.flushdbAsync());

  describe('addUser', () => {
    it('addUser should correctly add to db', () => {
      const userName = 'test';
      return users.addUser({ userName })
        .then(() => redis.sismemberAsync(CONSTANTS.USER_SET, userName))
        .then((result) => {
          expect(result).toBe(1);
        });
    });
  });
});
