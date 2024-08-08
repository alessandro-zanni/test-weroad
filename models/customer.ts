export class Customer {
  // id!: number;
  name!: string;
  email!: string;
  phone!: string;
  age!: number;
  gender!: 'male' | 'female' | 'other';

  constructor(data?: Partial<Customer>) {
    Object.assign(this, data || {});
  }
}
