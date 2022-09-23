// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

export const localStorageMock = (() => {
  let store: Record<string, number | boolean | string> = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: number | boolean | string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});