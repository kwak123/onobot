const redis = require('../src/db/redis');
const users = require('../src/db/users');

describe('users', () => {
  beforeEach(() => redis.flushdbAsync());

  afterAll(() => redis.flushdbAsync());

  describe('addUser', () => {
    it('correctly adds to db', () => {
      const userName = 'test';
      return users.addUser({ userName })
        .then(() => redis.hgetallAsync(userName))
        .then((result) => {
          const { karma, birthday } = result;
          expect(karma).toEqual('0'); // Redis stringifies everything by default
          expect(birthday).toEqual('');
        });
    });
  });

  describe('getUser', () => {
    it('correctly gets from db', () => {
      const userName = 'test';
      return redis.hmsetAsync(userName, 'karma', 0)
        .then(() => users.getUser({ userName }))
        .then((result) => {
          const { karma } = result;
          expect(karma).toEqual('0');
        });
    });

    it('returns nothing if user does not exist', () => {
      const userName = 'test';
      return users.getUser({ userName })
        .then((result) => {
          expect(result).toBeNull();
        });
    });
  });

  describe('getOrAddUser', () => {
    it('gets existing user', () => {
      const userName = 'test';
      return redis.hmsetAsync(userName, 'karma', 0)
        .then(() => users.getOrAddUser({ userName }))
        .then(result => expect(result).toBeTruthy());
    });

    it('will add a user if not yet existing', () => {
      const userName = 'test';
      const expectedUser = {
        karma: '0',
        birthday: '',
      };
      return users.getOrAddUser({ userName })
        .then((result) => {
          // Check we get it back
          expect(result).toEqual(expectedUser);
          return redis.hgetallAsync(userName);
        })
        .then((result) => {
          // Check it exists on redis manually
          expect(result).toEqual(expectedUser);
        });
    });
  });
});
