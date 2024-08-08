export class Travel {
  id!: number;
  name!: string;
  departure!: string;
  return!: string;
  picture!: string;
  description!: string;
  price!: number;
  rating!: number;

  constructor(data?: Partial<Travel>) {
    Object.assign(this, {
      ...data,
      departure: data?.departure?.split('T')[0],
      return: data?.return?.split('T')[0],
    });
  }
}
