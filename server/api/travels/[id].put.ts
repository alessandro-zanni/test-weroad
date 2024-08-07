import { delay } from '@/lib/utils';

export default defineEventHandler(async (event) => {
  // update a travel by id
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

  const travel = await readBody(event);

  // return the travel;
  return {
    status: 'ok',
    data: travel,
  };
});
