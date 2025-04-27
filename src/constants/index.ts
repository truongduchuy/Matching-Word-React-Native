export const WORD_LIST: Record<string, string>[] = [
  {english: 'bicycle', french: 'vélo'},
  {english: 'camel', french: 'chameau'},
  {english: 'folder', french: 'dossier'},
  {english: 'butter', french: 'beurre'},
  {english: 'cereal', french: 'céréale'},
  {english: 'hungry', french: 'faim'},
  {english: 'forest', french: 'forêt'},
  {english: 'weekly', french: 'hebdomadaire'},
  {english: 'desk', french: 'bureau'},
  {english: 'sibling', french: 'frère et soeur'},
  {english: 'limestone', french: 'calcaire'},
  {english: 'railroad', french: 'chemin de fer'},
];

export const WORD_LIST_MAP: Record<string, string> = Object.fromEntries(
  WORD_LIST.map(({english, french}) => [english, french]),
);

export function shuffleArray(array: string[]) {
  return array
    .map(item => ({item, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({item}) => item);
}