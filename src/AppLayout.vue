<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/layout/Sidebar.vue'
</script>

<style>
/* Bisa ditambahkan styling global di sini jika perlu */
</style>
