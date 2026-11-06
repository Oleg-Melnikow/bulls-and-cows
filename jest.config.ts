import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  // Браузерная среда, чтобы работали document.querySelector, addEventListener и т.д.
  testEnvironment: 'jsdom',
  // Ищем только стандартные файлы тестов .ts (без .tsx)
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  // Заглушки, чтобы Jest не падал, если вы импортируете CSS или картинки прямо в TS
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};

export default config;
