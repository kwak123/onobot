const util = require('../../src/utils/messages.util');

describe('messages.util', () => {
  describe('checkIsKarmaModifier', () => {
    it('returns array with string if <@SOMEUSER1>++', () => {
      const example = '<@SOMEUSER1>++';
      const result = util.checkIsKarmaModifier(example);
      expect(result).toHaveLength(1);
      expect(result).toContain(example);
    });

    it('returns array with string if <@SOMEUSER2>--', () => {
      const example = '<@SOMEUSER2>--';
      const result = util.checkIsKarmaModifier(example);
      expect(result).toHaveLength(1);
      expect(result).toContain(example);
    });

    it('returns array with string if long text that contains user', () => {
      const example = 'blah blah other stuff <@SOMEUSER1>++ asdfadsfsf blah';
      const expected = '<@SOMEUSER1>++';
      const result = util.checkIsKarmaModifier(example);
      expect(result).toHaveLength(1);
      expect(result).toContain(expected);
    });

    it('returns null if string is missing ++ and -- after user', () => {
      const example = '<@TESTUSER3>';
      const result = util.checkIsKarmaModifier(example);
      expect(result).toEqual(null);
    });

    it('returns null if string is missing user', () => {
      const example = '<>++';
      const result = util.checkIsKarmaModifier(example);
      expect(result).toEqual(null);
    });
  });
});
