<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from 'vue-sonner';

import type { Travel } from '@/models';
import type { ApiWrapper } from '@/types';
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
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';

interface Props {
  isCreate: boolean;
  data: Travel;
}
const { isCreate, data } = defineProps<Props>();

const router = useRouter();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(255),
    departure: z.string().date(),
    return: z.string().date(),
    picture: z.string().max(255),
    description: z.string().min(2).max(1000),
    price: z.number().gt(0),
    rating: z.number().min(1).max(5),
  }),
);

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: data,
});

async function createOrUpdateTravel(values: Partial<Travel>) {
  return new Promise<Travel>(async (resolve, reject) => {
    try {
      if (isCreate) {
        // Create
        const { status, data: createdData } = await $fetch<ApiWrapper<Travel>>(
          `/api/travels`,
          { method: 'POST', body: values },
        );
        if (status === 'ok') {
          resolve(createdData);
        } else {
          reject(status);
        }
      } else {
        // Edit
        const { status, data: editedData } = await $fetch<ApiWrapper<Travel>>(
          `/api/travels/${data.id}`,
          { method: 'PUT', body: values },
        );
        if (status === 'ok') {
          resolve(editedData);
        } else {
          reject(status);
        }
      }
    } catch (_) {
      reject('ko');
    }
  });
}

const onSubmit = handleSubmit((values) => {
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
});
</script>

<template>
  <ClientOnly>
    <form class="w-full md:w-2/3 lg:w-1/2 space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="departure">
        <FormItem>
          <FormLabel>Departure</FormLabel>
          <FormControl>
            <Input type="date" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="return">
        <FormItem>
          <FormLabel>Return</FormLabel>
          <FormControl>
            <Input type="date" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="picture">
        <FormItem>
          <FormLabel>Picture</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="price">
        <FormItem>
          <FormLabel>Price</FormLabel>
          <NumberField
            class="gap-2"
            :min="0"
            :default-value="data.price"
            :step="0.01"
            :format-options="{
              style: 'currency',
              currency: 'EUR',
              currencyDisplay: 'code',
            }"
            @update:model-value="
              (v?: number) => {
                if (v) {
                  setFieldValue('price', v);
                } else {
                  setFieldValue('price', undefined);
                }
              }
            "
          >
            <NumberFieldContent>
              <NumberFieldDecrement />
              <FormControl>
                <NumberFieldInput />
              </FormControl>
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="rating">
        <FormItem>
          <FormLabel>Rating</FormLabel>
          <NumberField
            class="gap-2"
            :min="1"
            :max="5"
            :default-value="data.rating"
            @update:model-value="
              (v?: number) => {
                if (v) {
                  setFieldValue('rating', v);
                } else {
                  setFieldValue('rating', undefined);
                }
              }
            "
          >
            <NumberFieldContent>
              <NumberFieldDecrement />
              <FormControl>
                <NumberFieldInput />
              </FormControl>
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" size="lg" class="w-full">{{
        isCreate ? 'Create' : 'Edit'
      }}</Button>
    </form>
  </ClientOnly>
</template>
