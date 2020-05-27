import Lockr from "lockr";

const localStorageKey = "bookManager";

export const saveLocalStorageData = (data) => {
  Lockr.set(localStorageKey, data);
};

export const getLocalStorageData = () => Lockr.get(localStorageKey);
