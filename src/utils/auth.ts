export type AuthMode = 'bearer' | 'cookie';

export const AUTH_MODE: AuthMode = import.meta.env.VITE_AUTH_MODE === 'cookie' ? 'cookie' : 'bearer';

const USER_TOKEN_KEY = 'token';

export const getUserToken = () => localStorage.getItem(USER_TOKEN_KEY);

export const setUserToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(USER_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(USER_TOKEN_KEY);
  }
};

export const removeUserToken = () => {
  localStorage.removeItem(USER_TOKEN_KEY);
};

export const isCookieAuth = () => AUTH_MODE === 'cookie';

export const getUserAuthHeader = () => {
  const token = getUserToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};
