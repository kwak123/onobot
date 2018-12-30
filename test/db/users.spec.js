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
    it('karmaUp === true, add 1 to karma', () => {
      const userId = 'id';
      const oldKarma = 1;
      const karmaUp = true;
      return users.setKarma({ userId, oldKarma, karmaUp })
        .then((newKarma) => {
          expect(newKarma).toEqual(oldKarma + 1);
          return redis.hgetAsync(userId, 'karma');
        })
        .then((karmaInDb) => {
          // Everything in redis is a string
          const numberfiedKarma = parseInt(karmaInDb, 10);
          expect(numberfiedKarma).toEqual(oldKarma + 1);
        });
    });

    it('karmaUp === false, remove 1 from karma', () => {
      const userId = 'id';
      const oldKarma = 2;
      const karmaUp = false;
      return users.setKarma({ userId, oldKarma, karmaUp })
        .then((newKarma) => {
          expect(newKarma).toEqual(oldKarma - 1);
          return redis.hgetAsync(userId, 'karma');
        })
        .then((karmaInDb) => {
          // Everything in redis is a string
          const numberfiedKarma = parseInt(karmaInDb, 10);
          expect(numberfiedKarma).toEqual(oldKarma - 1);
        });
    });
  });
});
