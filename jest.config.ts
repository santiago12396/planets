import type { Config } from 'jest';

export default {
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/app/$1',
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/app/**/*.ts', '!<rootDir>/node_modules/', '!<rootDir>/test/'],
} satisfies Config;
