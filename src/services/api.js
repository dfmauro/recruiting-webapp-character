import { get, post } from '../axios-config';

export const saveCharacter = (character) => {
  return post('', character);
};

export const getCharacter = () => {
  return get('');
};
