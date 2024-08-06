import { travelsData } from '@/server/travelsData';

export default defineEventHandler((event) => {
  // return a travel by id
  const id = getRouterParam(event, 'id');
  const travels = travelsData;
  const travel = travels.find((travel) => travel.id === Number(id));
  return {
    status: 'ok',
    data: travel,
  };
});
