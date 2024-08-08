import type { GenderType } from '@/types';

export class Customer {
  // id!: number;
  name!: string;
  email!: string;
  phone!: string;
  age!: number;
  gender!: GenderType;

  constructor(data?: Partial<Customer>) {
    Object.assign(this, data ?? {});
  }
}
