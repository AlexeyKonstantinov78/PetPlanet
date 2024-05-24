const KEY_STORAGE = 'cartItems';
export const API_URL = 'https://necessary-cherry-alloy.glitch.me';

export const getStorage = () => (JSON.parse(localStorage.getItem(KEY_STORAGE) || "[]"));

export const setStorage = (cartItems) => {
  localStorage.setItem(KEY_STORAGE, JSON.stringify(cartItems));
};

export const clearStorage = () => localStorage.removeItem(KEY_STORAGE);