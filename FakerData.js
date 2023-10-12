// ESM
import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    profile: faker.person.firstName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 30,
});
  
