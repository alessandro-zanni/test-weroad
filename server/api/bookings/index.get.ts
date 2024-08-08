import { bookingsData } from '@/server/bookingsData';
import { delay } from '@/lib/utils';

export default defineEventHandler(async () => {
  await delay(500);

  // return bookings list;
  const bookings = bookingsData;
  return {
    status: 'ok',
    data: bookings,
  };
});
