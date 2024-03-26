import { ValidValue } from '../validator/valid.value';

export const ValidMessageConstants = {
  USERNAME_LENGTH: `The 'username' field can be anywhere from ${ValidValue.USERNAME_LENGTH_MIN} to ${ValidValue.USERNAME_LENGTH_MAX} in length.`,
  USERNAME_STRING: `The 'username' field accepts only strings.`,
  USERNAME_NOT_EMPTY: `The 'username' field does not accept null, undefined, \`\`, [].`,
  NICKNAME_LENGTH: `The 'nickname' field can be anywhere from ${ValidValue.NICKNAME_LENGTH_MIN} to ${ValidValue.NICKNAME_LENGTH_MAX} in length.`,
  NICKNAME_STRING: `The 'nickname' field accepts only strings.`,
  NICKNAME_NOT_EMPTY: `The 'nickname' field does not accept null, undefined, \`\`, [].`,
  PASSWORD_LENGTH: `The 'password' field can be anywhere from ${ValidValue.PASSWORD_LENGTH_MIN} to ${ValidValue.PASSWORD_LENGTH_MAX} in length.`,
  PASSWORD_STRING: `The 'password' field accepts only strings.`,
  PASSWORD_NOT_EMPTY: `The 'password' field does not accept null, undefined, \`\`, [].`,
  IMAGE_STRING: `The 'image' field accepts only strings.(url)`,


  CATEGORY_STRING: '카테고리 이름은 문자열이여야 합니다.',
  CATEGORY_NOT_EMPTY: '카테고리 이름이 비어 있습니다.',
};
