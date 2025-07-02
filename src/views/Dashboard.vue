<template>
  <div class="bg-gray-50 min-h-screen">
    <main class="p-6 space-y-6">
      <div class="grid grid-cols-4 gap-4">
        <StatCard title="Total Customers" value="567,899" change="+2.5%" />
        <StatCard title="Total Revenue" value="$3,465 M" change="+0.5%" />
        <StatCard title="Total Orders" value="1,136 M" change="-0.2%" />
        <StatCard title="Total Returns" value="1,789" change="+0.12%" />
      </div>

      <ProductChart />

      <div class="grid grid-cols-2 gap-6">
        <CategoryPie />
        <CountryList />
      </div>
    </main>
  </div>
</template>

<script setup>
// import StatCard from '../components/widgets/StatCard.vue'
// import ProductChart from '../components/widgets/ProductChart.vue'
// import CategoryPie from '../components/widgets/CategoryPie.vue'
// import CountryList from '../components/widgets/CountryList.vue'
</script>
