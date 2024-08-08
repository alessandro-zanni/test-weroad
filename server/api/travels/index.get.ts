import { delay } from '@/lib/utils';
import { travelsData } from '@/server/travels-data';

export default defineEventHandler(async () => {
  await delay(500);

  // return travels list;
  const travels = travelsData;
  return {
    status: 'ok',
    data: travels,
  };
});
