import { faker } from '@faker-js/faker';
import { Booking } from '@/models/booking';
import { PaymentType } from '@/types';

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newBooking = (): Booking => {
  return {
    id: 0,
    travelId: faker.number.int({ min: 1, max: 500 }),
    customer: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      age: faker.number.int({ min: 18, max: 99 }),
      gender: faker.person.sexType(),
    },
    paymentType: faker.helpers.enumValue(PaymentType),
    note: faker.lorem.sentence(),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Booking[] => {
    const len = lens[depth]!;
    return range(len).map((_, index): Booking => {
      return {
        ...newBooking(),
        id: index + 1,
      };
    });
  };

  return makeDataLevel();
}

export default defineEventHandler(() => {
  return {
    bookings: makeData(500),
  };
});
