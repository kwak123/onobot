const checkIsKarmaModifier = text => text.search(/<@.+>(\+\+)|(--)/) >= 0;

module.exports = {
  checkIsKarmaModifier,
};
