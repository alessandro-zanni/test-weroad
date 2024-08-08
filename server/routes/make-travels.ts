import { faker } from '@faker-js/faker';
import { Travel } from '@/models/travel';

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newTravel = (): Travel => {
  return {
    id: 0,
    name: faker.location.city(),
    departure: faker.date.recent().toISOString(),
    return: faker.date.future().toISOString(),
    picture: faker.image.urlLoremFlickr(),
    description: faker.lorem.text(),
    price: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
    rating: faker.number.int({ min: 1, max: 5 }),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Travel[] => {
    const len = lens[depth]!;
    return range(len).map((_, index): Travel => {
      return {
        ...newTravel(),
        id: index + 1,
      };
    });
  };

  return makeDataLevel();
}

export default defineEventHandler(() => {
  return {
    travels: makeData(500),
  };
});
