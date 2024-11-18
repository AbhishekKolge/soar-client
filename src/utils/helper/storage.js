import { AUTH_STORAGE_NAME } from "../constants";

export const saveAuthStorage = (auth) => {
  localStorage.setItem(AUTH_STORAGE_NAME, JSON.stringify(auth));
};

export const getAuthStorage = () => {
  const auth = localStorage.getItem(AUTH_STORAGE_NAME);
  return auth && JSON.parse(auth);
};

export const removeAuthStorage = () => {
  localStorage.removeItem(AUTH_STORAGE_NAME);
};
