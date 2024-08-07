import { travelsData } from '@/server/travelsData';
import { delay } from '@/lib/utils';

export default defineEventHandler(async () => {
  await delay(500);

  // return travels list;
  const travels = travelsData;
  return {
    status: 'ok',
    data: travels,
  };
});
