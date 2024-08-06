<!-- <script setup lang="tsx">
  import { createColumnHelper, type CellContext } from '@tanstack/vue-table';
  import type { Travel } from '~/models';
  import DataTableActions from '~/components/DataTableActions.vue';

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  const { data, status } = await useFetch<{ data: Travel[] }>('api/travels', {
    lazy: true,
    server: false,
  });
  const travels = computed({
    get: () => data.value?.data ?? [],
    set: (value) => {
      data.value = { ...data.value, data: value };
    },
  });
  const loading = computed(() => status.value === 'pending');

  const handleTravelDelete = (id: number) => {
    const index = travels.value.findIndex((travel) => travel.id === id);
    travels.value.splice(index, 1);
  };

  const columnHelper = createColumnHelper<Travel>();
  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: (props) => {
        return (
          <div class="flex items-center whitespace-nowrap">
            <img
              src={props.row.original.picture}
              alt={props.row.original.name}
              class="w-auto h-8 mr-3"
            />
            {props.row.original.name}
          </div>
        );
      },
    }),
    columnHelper.accessor('departure', {
      header: () => 'Departure',
      cell: (props) => {
        return new Date(props.row.original.departure).toLocaleDateString();
      },
    }),
    columnHelper.accessor('return', {
      header: () => 'Return',
      cell: (props) => {
        return new Date(props.row.original.return).toLocaleDateString();
      },
    }),
    columnHelper.accessor('description', {
      header: () => 'Description',
    }),
    columnHelper.accessor('price', {
      header: () => 'Price',
      cell: (props) => {
        return formatPrice(props.row.original.price);
      },
    }),
    columnHelper.accessor('rating', {
      header: () => 'Rating',
      cell: (props) => {
        const rating = props.row.original.rating;
        return (
          <div class="flex items-center">
            {stars.map((star) => (
              <svg
                aria-hidden="true"
                class={[
                  star <= rating
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-500',
                  'w-5 h-5',
                ]}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span class="ml-1 text-gray-500 dark:text-gray-400">{rating}</span>
          </div>
        );
      },
    }),
    {
      id: 'actions',
      header: () => 'Actions',
      cell: (props: CellContext<any, unknown>) => {
        const editLink = `/travels/${props.row.original.id}`;
        return (
          <DataTableActions
            id={props.row.original.id}
            editLink={editLink}
            onDelete:travel={handleTravelDelete}
          />
        );
      },
    },
  ];
</script>

<template>
  <PageHeading title="Travels" />
  <div v-if="loading" class="flex justify-center items-center h-96">
    Loading...
  </div>
  <DataTable
    :key="travels.length"
    v-if="!loading && travels"
    :columns="columns"
    :data="travels"
    createLink="travels/create"
  />
</template> -->

<script setup lang="ts">
import { RecentSales } from '@/components/recent-sales';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
</script>

<template>
  <div class="flex items-center justify-between space-y-2">
    <h2 class="text-3xl font-bold tracking-tight">Travels</h2>
  </div>
  <Tabs default-value="overview" class="space-y-4">
    <TabsList>
      <TabsTrigger value="overview"> Overview </TabsTrigger>
      <TabsTrigger value="analytics" disabled> Analytics </TabsTrigger>
      <TabsTrigger value="reports" disabled> Reports </TabsTrigger>
      <TabsTrigger value="notifications" disabled> Notifications </TabsTrigger>
    </TabsList>
    <TabsContent value="overview" class="space-y-4">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"> Total Revenue </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path
                d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">$45,231.89</div>
            <p class="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"> Subscriptions </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">+2350</div>
            <p class="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"> Sales </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">+12,234</div>
            <p class="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"> Active Now </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">+573</div>
            <p class="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card class="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent class="pl-2"> Overview </CardContent>
        </Card>
        <Card class="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription> You made 265 sales this month. </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  </Tabs>
</template>
