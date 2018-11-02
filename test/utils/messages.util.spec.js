const util = require('../../src/utils/messages.util');

describe('messages.util', () => {
  describe('checkIsKarmaModifier', () => {
    it('returns true if string contains <@SOMEUSER1>++', () => {
      const example = '<@SOMEUSER1>++';
      const result = util.checkIsKarmaModifier(example);
      expect(result).toBe(true);
    });

    it('returns true if string contains <@SOMEUSER2>--', () => {
      const example = '<@SOMEUSER2>--';
      const result = util.checkIsKarmaModifier(example);
      expect(result).toBe(true);
    });

    it('returns false if string is missing ++ and -- after user', () => {
      const example = '<@TESTUSER3>';
      const result = util.checkIsKarmaModifier(example);
      expect(result).toBe(false);
    });

    it('returns false if string is missing user', () => {
      const example = '<>++';
      const result = util.checkIsKarmaModifier(example);
      expect(result).toBe(false);
    });
  });
});
