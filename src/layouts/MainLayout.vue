<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <div class="flex-1">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/layout/Sidebar.vue'
import Header from '../components/layout/Header.vue'
</script>

<style>
/* Bisa ditambahkan styling global di sini jika perlu */
</style>
