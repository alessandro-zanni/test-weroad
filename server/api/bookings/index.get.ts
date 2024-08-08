import { delay } from '@/lib/utils';
import { getBookingsData } from '@/server/get-bookings-data';

export default defineEventHandler(async () => {
  await delay(500);

  // return bookings list;
  const bookings = getBookingsData();

  return {
    status: 'ok',
    data: bookings,
  };
});
