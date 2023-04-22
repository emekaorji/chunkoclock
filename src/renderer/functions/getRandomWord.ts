import words from '../data/words.json';

export default function getRandomTitle() {
  const randIndex1 = Math.round(Math.random() * (words.adjective.length - 1));
  const randIndex2 = Math.round(Math.random() * (words.noun.length - 1));
  return `${words.adjective[randIndex1]} ${words.noun[randIndex2]}`;
}
