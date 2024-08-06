import { travelsData } from '~/server/travelsData';

export default defineEventHandler((event) => {
  // delete a travel by id
  const id = getRouterParam(event, 'id');
  const travels = travelsData;
  const index = travels.findIndex((travel) => travel.id === Number(id));
  if (index === -1) {
    return {
      status: 'ko',
    };
  }
  // return success
  return {
    status: 'ok',
  };
});
