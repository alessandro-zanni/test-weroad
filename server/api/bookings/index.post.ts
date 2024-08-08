import { delay } from '@/lib/utils';

export default defineEventHandler(async (event) => {
  // create a booking
  const booking = await readBody(event);

  await delay(500);

  // return the booking;
  return {
    status: 'ok',
    data: booking,
  };
});
