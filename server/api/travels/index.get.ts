import { travelsData } from '@/server/travelsData';

export default defineEventHandler(() => {
  // return travels list;
  const travels = travelsData;
  return {
    status: 'ok',
    data: travels,
  };
});
