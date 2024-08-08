<script setup lang="ts">
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { Button } from '@/components/ui/button';
import { toast } from 'vue-sonner';
import { AutoForm } from '@/components/ui/auto-form';
import type { Travel } from '@/models';
import type { ApiWrapper } from '@/types';

interface Props {
  isCreate: boolean;
  data: Travel;
}
const { isCreate, data } = defineProps<Props>();

const router = useRouter();

const schema = z.object({
  name: z.string().min(2).max(255).describe('Name'),
  departure: z.string().date().describe('Departure'),
  return: z.string().date().describe('Return'),
  picture: z.string().max(255).describe('Picture'),
  description: z.string().min(2).max(1000).describe('Description'),
  price: z.coerce.number().gt(0).describe('Price'),
  rating: z.coerce.number().int().min(1).max(5).default(1).describe('Rating'),
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: data,
});

async function createOrUpdateTravel(values: Partial<Travel>) {
  return new Promise<Travel>((resolve, reject) => {
    if (isCreate) {
      // Create
      $fetch<ApiWrapper<Travel>>(`/api/travels`, {
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
        .catch((err) => {
          reject(err);
        });
    } else {
      // Edit
      $fetch<ApiWrapper<Travel>>(`/api/travels/${data.id}`, {
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
        .catch((err) => {
          reject(err);
        });
    }
  });
}

function onSubmit(values: Record<string, any>) {
  const promise = createOrUpdateTravel(values);

  toast.promise(promise, {
    loading: 'Loading...',
    success: () => {
      router.push('/travels');
      return isCreate ? 'Travel created' : 'Travel edited';
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
}
</script>

<template>
  <ClientOnly>
    <AutoForm
      class="w-full md:w-2/3 lg:w-1/2 space-y-6"
      :schema="schema"
      :form="form"
      @submit="onSubmit"
      :field-config="{
        departure: {
          inputProps: {
            type: 'date',
          },
        },
        return: {
          inputProps: {
            type: 'date',
          },
        },
        description: { component: 'textarea' },
        price: {
          inputProps: {
            min: 0,
            step: 0.01,
          },
        },
        rating: { inputProps: { min: 1, max: 5 } },
      }"
    >
      <Button type="submit" size="lg" class="w-full">{{
        isCreate ? 'Create' : 'Edit'
      }}</Button>
    </AutoForm>
  </ClientOnly>
</template>
