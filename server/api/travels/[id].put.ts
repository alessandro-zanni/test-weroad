export default defineEventHandler(async (event) => {
  // update a travel by id
  const id = getRouterParam(event, 'id');
  const travel = await readBody(event);

  // return the travel;
  return {
    status: 'ok',
    data: travel,
  };
});
