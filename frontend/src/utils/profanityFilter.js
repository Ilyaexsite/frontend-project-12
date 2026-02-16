import leoProfanity from 'leo-profanity';


const filter = leoProfanity;


filter.loadDictionary('ru');


const additionalWords = [
  'нецензурное1',
  'нецензурное2',

];

additionalWords.forEach(word => filter.add(word));


export const cleanProfanity = (text) => {
  if (!text || typeof text !== 'string') return text;
  return filter.clean(text);
};


export const hasProfanity = (text) => {
  if (!text || typeof text !== 'string') return false;
  return filter.check(text);
};

export const getProfanityList = () => {
  return filter.list();
};

export const addProfanityWord = (word) => {
  if (word && typeof word === 'string') {
    filter.add(word);
  }
};

export const resetProfanityFilter = () => {
  filter.reset();
  filter.loadDictionary('ru');
};

export default {
  clean: cleanProfanity,
  check: hasProfanity,
  list: getProfanityList,
  add: addProfanityWord,
  reset: resetProfanityFilter,
};