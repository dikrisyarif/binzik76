<template>
  <div class="min-h-screen flex">
    <!-- Left Visual -->
    <div class="hidden md:flex w-1/2 items-center justify-center p-10 bg-white ">
      <img src="/mlcibackground.png" alt="Illustration" class="max-w-full h-auto" />
    </div>
    <!-- Right Slot for Form -->
    <div class="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
      <div class="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <div class="text-center mb-8">
          <img src="/MLCI.png" alt="Logo" class="mx-auto mb-2 w-10 h-10" />
          <h2 class="text-2xl font-bold text-gray-800">Welcome</h2>
          <p class="text-sm text-gray-500">To <span class="font-semibold text-indigo-600">Miwa Outsider</span></p>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

</style>
