<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from 'vue-sonner';

import type { Booking } from '@/models';
import { GenderType, PaymentType, type ApiWrapper } from '@/types';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  isCreate: boolean;
  data: Booking;
}
const { isCreate, data } = defineProps<Props>();

const router = useRouter();

const formSchema = toTypedSchema(
  z.object({
    travelId: z.number().int().min(1),
    customer: z.object({
      name: z.string().min(2).max(255),
      email: z.string().email().max(255),
      phone: z.string().max(255),
      age: z.number().int().min(18).max(99),
      gender: z.nativeEnum(GenderType),
    }),
    paymentType: z.nativeEnum(PaymentType),
    note: z.string().min(2).max(1000).optional(),
  }),
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: data,
});

async function createOrUpdateBooking(values: Partial<Booking>) {
  return new Promise<Booking>((resolve, reject) => {
    if (isCreate) {
      // Create
      $fetch<ApiWrapper<Booking>>(`/api/bookings`, {
        method: 'POST',
        body: values,
      })
        .then(({ status, data: createdData }) => {
          if (status === 'ok') {
            resolve(createdData);
          } else {
            reject(status);
          }
        })
        .catch(() => {
          reject('ko');
        });
    } else {
      // Edit
      $fetch<ApiWrapper<Booking>>(`/api/bookings/${data.id}`, {
        method: 'PUT',
        body: values,
      })
        .then(({ status, data: editedData }) => {
          if (status === 'ok') {
            resolve(editedData);
          } else {
            reject(status);
          }
        })
        .catch(() => {
          reject('ko');
        });
    }
  });
}

const onSubmit = handleSubmit((values) => {
  const promise = createOrUpdateBooking(values);

  toast.promise(promise, {
    loading: 'Loading...',
    success: () => {
      router.push('/bookings');
      return isCreate ? 'Booking created' : 'Booking edited';
    },
    error: () => ({
      name: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      action: {
        label: 'Try again',
        onClick: onSubmit,
      },
    }),
  });
});
</script>

<template>
  <ClientOnly>
    <form class="w-full md:w-2/3 lg:w-1/2 space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="paymentType">
        <FormItem>
          <FormLabel>Payment type</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="note">
        <FormItem>
          <FormLabel>Note</FormLabel>
          <FormControl>
            <Textarea v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" size="lg" class="w-full">
        {{ isCreate ? 'Create' : 'Edit' }}
      </Button>
    </form>
  </ClientOnly>
</template>
