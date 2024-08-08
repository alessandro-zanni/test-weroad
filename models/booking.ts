import type { PaymentType } from '@/types';
import type { Customer } from './customer';

export class Booking {
  id!: number;
  travelId!: number;
  customer!: Customer;
  paymentType!: PaymentType;
  note!: string;

  constructor(data?: Partial<Booking>) {
    Object.assign(this, data || {});
  }
}
