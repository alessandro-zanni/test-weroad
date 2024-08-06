export default defineEventHandler(async (event) => {
  // create a travel
  const travel = await readBody(event);

  // return the travel;
  return {
    status: 'ok',
    data: travel,
  };
});
