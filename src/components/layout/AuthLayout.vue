<template>
  <div class="min-h-screen flex">
    <!-- Left Visual: Solar System Animation (1 planet, orbit benar) -->
    <div class="hidden md:flex w-1/2 items-center justify-center p-10 bg-white">
      <div class="relative w-[350px] h-[350px] flex items-center justify-center">
        <!-- Orbit -->
        <div class="absolute inset-0 rounded-full border border-blue-400 border-dashed"></div>
        <!-- Planet di atas orbit -->
        <div class="absolute inset-0 flex items-center justify-center animate-spin-orbit" style="animation-duration:8s;">
          <div class="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full shadow-lg"></div>
        </div>
        <!-- Matahari di tengah -->
        <div class="absolute left-1/2 top-1/2 w-24 h-24 bg-yellow-400 rounded-full shadow-2xl shadow-yellow-300 -translate-x-1/2 -translate-y-1/2 z-20"></div>
      </div>
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

@keyframes spin-orbit {
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin-orbit {
  animation: spin-orbit 8s linear infinite;
}
</style>
