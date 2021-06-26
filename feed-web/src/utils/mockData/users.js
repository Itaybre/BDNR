/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';

const generateBaseUser = () => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
});

export const generateAdminUser = () => ({
  ...generateBaseUser(),
  isAdmin: true,
});

export const generateNonAdminUser = () => ({
  ...generateBaseUser(),
  isAdmin: false,
});
