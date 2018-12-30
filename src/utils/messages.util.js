const checkIsKarmaModifier = (text = '') => text.match(/(<@\w+>\+\+)|(<@\w+>--)/g);

const getKarmaModifierList = (text = '') => text
  .split(' ')
  .map((word) => {
    const modifier = checkIsKarmaModifier(word);
    return modifier ? modifier[0] : null;
  })
  .filter(matchedArray => matchedArray && !!matchedArray.length);

const parseKarmaModifierList = (karmaModifierArray = []) => karmaModifierArray.reduce((acc, karmaModifier) => {
  const userId = karmaModifier.slice(2, 11);
  const karmaUp = karmaModifier.slice(-2) === '++';
  const karmaDown = karmaModifier.slice(-2) === '--';

  // Initialize
  if (!acc[userId]) {
    acc[userId] = 0;
  }

  // Specificity counts here
  if (karmaUp) {
    acc[userId] += 1;
  }
  else if (karmaDown) {
    acc[userId] -= 1;
  }

  return acc;
}, {});

module.exports = {
  checkIsKarmaModifier,
  getKarmaModifierList,
  parseKarmaModifierList,
};
