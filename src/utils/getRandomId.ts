import { customAlphabet } from 'nanoid';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 20);

export const getRandomId = () => {
  return nanoid(); //=> "Ku3dMvOi11qE3vvI9QaJ"
};
