import { delay } from '@/lib/utils';

export default defineEventHandler(async (event) => {
  // create a travel
  const travel = await readBody(event);

  await delay(500);

  // return the travel;
  return {
    status: 'ok',
    data: travel,
  };
});
