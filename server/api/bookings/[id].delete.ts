import { delay } from '@/lib/utils';
import { getBookingsData } from '~/server/get-bookings-data';

export default defineEventHandler(async (event) => {
  // delete a booking by id
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing id',
    });
  }

  const numId = Number(id);

  if (isNaN(numId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid id',
    });
  }

  if (!Number.isInteger(numId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID should be an integer',
    });
  }

  await delay(500);

  const bookings = getBookingsData();
  const index = bookings.findIndex((booking) => booking.id === Number(id));
  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Booking not found',
    });
  }

  // return success
  return {
    status: 'ok',
  };
});
