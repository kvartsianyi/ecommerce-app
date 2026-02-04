export const COUNTRY_CODE_UA = '+380';

export const SOMETHING_WENT_WRONG = 'Щось пішло не так. Спробуйте ще раз.';

export const ERROR_KEYS = {
  TOKEN_INVALID_OR_EXPIRED: 'Token is invalid or has expired',
  EMAIL_ALREADY_CONFIRMED: 'Email is already confirmed',
} as const;

export const ERROR_MESSAGES = {
  [ERROR_KEYS.TOKEN_INVALID_OR_EXPIRED]:
    'Посилання недійсне або термін його дії минув.',
  [ERROR_KEYS.EMAIL_ALREADY_CONFIRMED]:
    'Ваша електронна адреса вже підтверджена.',
} as const;
