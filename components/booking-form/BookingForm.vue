<script setup lang="ts">
import {
  Check,
  ChevronsUpDownIcon,
  Circle,
  Dot,
  Loader2,
} from 'lucide-vue-next';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { computed, ref } from 'vue';
import { get, set } from '@vueuse/core';
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'vue-sonner';
import type { Booking, Travel } from '@/models';
import {
  GenderType,
  PaymentType,
  type ApiWrapper,
  type StepType,
} from '@/types';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface Props {
  isCreate: boolean;
  data: Booking;
}
const { isCreate, data } = defineProps<Props>();

const router = useRouter();

const schema = [
  z.object({
    travelId: z.coerce.number().int().min(1),
  }),
  z.object({
    customer: z.object({
      name: z.string().min(2).max(255),
      email: z.string().email().max(255),
      phone: z.string().max(255),
      age: z.coerce.number().int().min(18).max(99),
      gender: z.nativeEnum(GenderType),
    }),
  }),
  z.object({
    paymentType: z.nativeEnum(PaymentType),
    note: z.string().min(2).max(1000).optional(),
  }),
];

const stepIndex = ref(1);
const steps: StepType[] = [
  {
    step: 1,
    title: 'Select travel',
  },
  {
    step: 2,
    title: 'Customer infos',
  },
  {
    step: 3,
    title: 'Select payment',
  },
];

const canGoNext = computed(() => stepIndex.value < steps.length);
const canGoBack = computed(() => stepIndex.value > 1);
function goNext() {
  if (get(canGoNext)) {
    set(stepIndex, stepIndex.value + 1);
  }
}
function goBack() {
  if (get(canGoBack)) {
    set(stepIndex, stepIndex.value - 1);
  }
}

const travels = ref<Travel[]>([]);
const loading = ref(true);

async function getData(): Promise<Travel[]> {
  loading.value = true;
  const { data } = await $fetch<ApiWrapper<Travel[]>>('/api/travels');
  loading.value = false;
  return data ?? [];
}

onMounted(async () => {
  travels.value = (await getData()).slice(0, 20); // Limit to 20
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
        .catch((err) => {
          reject(err);
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
        .catch((err) => {
          reject(err);
        });
    }
  });
}

function onSubmit(values: Booking) {
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
}
</script>

<template>
  <ClientOnly>
    <Form
      v-slot="{ meta, values, validate, setFieldValue }"
      as=""
      keep-values
      :validation-schema="toTypedSchema(schema[stepIndex - 1])"
    >
      <form
        @submit="
          (e) => {
            e.preventDefault();
            validate();

            if (stepIndex === steps.length) {
              onSubmit(values as Booking);
            }
          }
        "
      >
        <Stepper v-model="stepIndex" class="flex w-full items-start gap-2">
          <StepperItem
            v-for="step in steps"
            :key="step.step"
            v-slot="{ state }"
            class="relative flex w-full flex-col items-center justify-center"
            :step="step.step"
          >
            <StepperSeparator
              v-if="step.step !== steps[steps.length - 1].step"
              class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />

            <StepperTrigger as-child>
              <Button
                :variant="
                  state === 'completed' || state === 'active'
                    ? 'default'
                    : 'outline'
                "
                size="icon"
                class="z-10 rounded-full shrink-0"
                :class="[
                  state === 'active' &&
                    'ring-2 ring-ring ring-offset-2 ring-offset-background',
                ]"
                :disabled="state !== 'completed' && !meta.valid"
              >
                <Check v-if="state === 'completed'" class="size-5" />
                <Circle v-if="state === 'active'" />
                <Dot v-if="state === 'inactive'" />
              </Button>
            </StepperTrigger>

            <div class="mt-5 flex flex-col items-center text-center">
              <StepperTitle
                :class="[state === 'active' && 'text-primary']"
                class="text-sm font-semibold transition lg:text-base"
              >
                {{ step.title }}
              </StepperTitle>
              <StepperDescription
                v-if="step.description"
                :class="[state === 'active' && 'text-primary']"
                class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
              >
                {{ step.description }}
              </StepperDescription>
            </div>
          </StepperItem>
        </Stepper>

        <div class="flex flex-col gap-4 mt-4">
          <template v-if="stepIndex === 1">
            <FormField v-if="travels" name="travelId">
              <FormItem class="flex flex-col">
                <FormLabel>Select travel</FormLabel>
                <Popover>
                  <PopoverTrigger as-child>
                    <FormControl>
                      <Button
                        variant="outline"
                        :disabled="loading"
                        :class="
                          cn(
                            'w-[200px] justify-between',
                            !values.travelId && 'text-muted-foreground',
                          )
                        "
                      >
                        <Loader2
                          v-if="loading"
                          class="w-4 h-4 mr-2 animate-spin"
                        />
                        {{
                          values.travelId
                            ? travels.find(
                                (travel) => travel.id === values.travelId,
                              )?.name
                            : 'Select travel...'
                        }}
                        <ChevronsUpDownIcon
                          class="ml-2 h-4 w-4 shrink-0 opacity-50"
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent class="w-[200px] p-0">
                    <Command :key="travels.length">
                      <CommandInput placeholder="Search travel..." />
                      <CommandEmpty>Nothing found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            v-for="travel in travels"
                            :key="travel.id"
                            :value="travel.id"
                            @select="
                              () => {
                                setFieldValue('travelId', travel.id);
                              }
                            "
                          >
                            <Check
                              :class="
                                cn(
                                  'mr-2 h-4 w-4',
                                  travel.id === values.travelId
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )
                              "
                            />
                            {{ travel.name }}
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            </FormField>
          </template>

          <template v-if="stepIndex === 2">
            <FormField v-slot="{ componentField }" name="customer.name">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="customer.email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="customer.phone">
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="customer.age">
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    :min="18"
                    :max="99"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="customer.gender">
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
          </template>

          <template v-if="stepIndex === 3">
            <FormField v-slot="{ componentField }" name="paymentType">
              <FormItem>
                <FormLabel>Payment type</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Credit transfer"
                        >Credit transfer</SelectItem
                      >
                      <SelectItem value="Paypal">Paypal</SelectItem>
                      <SelectItem value="Revolut">Revolut</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
          </template>
        </div>

        <div class="flex items-center justify-between mt-4">
          <Button
            :disabled="!canGoBack"
            variant="outline"
            size="sm"
            @click="goBack"
          >
            Back
          </Button>
          <div class="flex items-center gap-3">
            <Button
              v-if="stepIndex !== 3"
              :type="meta.valid ? 'button' : 'submit'"
              :disabled="!canGoNext"
              size="sm"
              @click="meta.valid && goNext()"
            >
              Next
            </Button>
            <Button v-if="stepIndex === 3" size="sm" type="submit">
              {{ isCreate ? 'Create' : 'Edit' }}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  </ClientOnly>
</template>
