const checkIsKarmaModifier = (text = '') => text.match(/(<@\w+>\+\+)|(<@\w+>--)/g);

module.exports = {
  checkIsKarmaModifier,
};
