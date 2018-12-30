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

  describe('getKarmaModifierList', () => {
    it('empty string, return empty array', () => {
      const result = util.getKarmaModifierList('');
      expect(result).toEqual([]);
    });

    it('has no karma modifiers, return empty array', () => {
      const result = util.getKarmaModifierList('<@12345678>');
      expect(result).toEqual([]);
    });

    it('has one karmaModifier, return array', () => {
      const oneModifier = '<@12345678>++';
      const result = util.getKarmaModifierList(oneModifier);
      expect(result).toEqual([oneModifier]);
    });

    it('has two karmaModifer, return array', () => {
      const oneModifier = '<@12345678>++';
      const twoModifier = '<@87654321>--';
      const result = util.getKarmaModifierList(`${oneModifier} ${twoModifier}`);
      expect(result).toEqual([oneModifier, twoModifier]);
    });

    it('has two split karmaModifer, return array', () => {
      const oneModifier = '<@12345678>++';
      const twoModifier = '<@87654321>--';
      const result = util.getKarmaModifierList(`${oneModifier} notvalid ${twoModifier}`);
      expect(result).toEqual([oneModifier, twoModifier]);
    });
  });

  describe('parseKarmaModifierList', () => {
    it('empty array, return empty object', () => {
      const result = util.parseKarmaModifierList([]);
      expect(result).toEqual({});
    });

    it('creates expected map with one modifier', () => {
      const oneModifier = '<@123456789>++';
      const expected = {
        123456789: 1,
      };
      const result = util.parseKarmaModifierList([oneModifier]);
      expect(result).toEqual(expected);
    });

    it('creates expected map with double modifier', () => {
      const oneModifier = '<@123456789>++';
      const expected = {
        123456789: 2,
      };
      const result = util.parseKarmaModifierList([oneModifier, oneModifier]);
      expect(result).toEqual(expected);
    });

    it('creates expected map with two users', () => {
      const oneModifier = '<@123456789>++';
      const twoModifier = '<@987654321>--';
      const expected = {
        123456789: 1,
        987654321: -1,
      };
      const result = util.parseKarmaModifierList([oneModifier, twoModifier]);
      expect(result).toEqual(expected);
    });
  });
});
