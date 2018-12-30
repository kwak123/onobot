const redis = require('../../src/db/redis');
const users = require('../../src/db/users');

describe('users', () => {
  beforeEach(() => redis.flushdbAsync());

  afterAll(() => redis.flushdbAsync());

  describe('addUser', () => {
    it('correctly adds to db', () => {
      const userId = 'id';
      const userName = 'test';
      return users.addUser({ userId, userName })
        .then(() => redis.hgetallAsync(userId))
        .then((result) => {
          const { karma, birthday } = result;
          expect(karma).toEqual('0'); // Redis stringifies everything by default
          expect(birthday).toEqual('');
        });
    });
  });

  describe('getUser', () => {
    it('correctly gets from db', () => {
      const userId = 'id';
      return redis.hmsetAsync(userId, 'karma', 0)
        .then(() => users.getUser({ userId }))
        .then((result) => {
          const { karma } = result;
          expect(karma).toEqual('0');
        });
    });

    it('returns nothing if user does not exist', () => {
      const userId = 'test';
      return users.getUser({ userId })
        .then((result) => {
          expect(result).toBeNull();
        });
    });
  });

  describe('setKarma', () => {
    it('sets karma and returns new karma', () => {
      const userId = 'id';
      const newKarma = 3;

      return users.setKarma({ userId, newKarma })
        .then((karma) => {
          expect(karma).toEqual(newKarma);
          // Check db is updated
          return redis.hgetAsync(userId, 'karma');
        })
        .then((karmaFromDatabase) => {
          // Redis always returns strings
          const numberfiedKarma = parseInt(karmaFromDatabase, 10);
          expect(numberfiedKarma).toEqual(newKarma);
        });
    });
  });
});
