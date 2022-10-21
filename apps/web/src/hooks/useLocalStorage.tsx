import { useState } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (typeof item === "string") {
        return item;
      }
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T), preserve = true) => {
    try {
      if (value === null) {
        window.localStorage.removeItem(key);
        setStoredValue(null as T);
        return;
      }
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (preserve) {
        window.localStorage.setItem(
          key,
          typeof valueToStore === "string"
            ? valueToStore
            : JSON.stringify(valueToStore)
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};
