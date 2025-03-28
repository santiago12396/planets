import { faker } from '@faker-js/faker';
import { Body } from './system-solar.model';

export const generateFakeBody = (data?: Partial<Body>): Body => ({
  id: faker.string.uuid(),
  englishName: faker.lorem.word(),
  name: faker.lorem.word(),
  moons: [
    { moon: faker.lorem.word(), rel: faker.internet.url() },
    { moon: faker.lorem.word(), rel: faker.internet.url() },
  ],
  mass: {
    massValue: faker.number.float({ min: 1, max: 1000 }),
    massExponent: faker.number.int({ min: 20, max: 30 }),
  },
  avgTemp: faker.number.float({ min: 50, max: 500 }),
  meanRadius: faker.number.float({ min: 1000, max: 100000 }),
  gravity: faker.number.float({ min: 0.1, max: 100 }),
  sideralOrbit: faker.number.float({ min: 10, max: 1000 }),
  sideralRotation: faker.number.float({ min: 1, max: 100 }),
  ...data,
});
