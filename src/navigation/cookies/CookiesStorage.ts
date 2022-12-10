import { getItem, removeItem, setItem } from '@cloudrock/auth/AuthStorage';

const key = 'hideCookiesConsent';

export const setConsent = (value: string) => setItem(key, value);

export const resetConsent = () => removeItem(key);

export const getConsent = () => getItem(key);
