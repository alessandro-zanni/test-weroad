import type { PaymentType } from '@/types';
import type { Customer } from './customer';
import type { Travel } from './travel';

export class Booking {
  id!: number;
  travelId!: number;
  customer!: Customer;
  paymentType!: PaymentType;
  note!: string;

  // transients
  travel?: Travel;

  constructor(data?: Partial<Booking>) {
    Object.assign(this, data || {});
  }
}
