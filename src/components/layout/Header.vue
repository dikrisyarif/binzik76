<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white shadow">
    <div class="flex flex-col gap-1">
      <nav class="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2">
          <li>
            <router-link to="/dashboard" class="inline-flex items-center hover:text-indigo-600">
              <span class="material-icons text-base mr-1">home</span> Dashboard
            </router-link>
          </li>
          <li v-for="(crumb, idx) in breadcrumbs" :key="idx" class="flex items-center">
            <span class="mx-2">/</span>
            <span v-if="idx < breadcrumbs.length - 1">
              <router-link :to="crumb.path" class="hover:text-indigo-600">{{ crumb.label }}</router-link>
            </span>
            <span v-else class="text-indigo-700 font-semibold">{{ crumb.label }}</span>
          </li>
        </ol>
      </nav>
      <!-- <h1 class="text-xl font-semibold text-indigo-700">{{ menuTitle }}</h1> -->
    </div>
    <div class="flex items-center space-x-4">
      <div class="relative">
        <button class="relative text-gray-600 hover:text-indigo-600 focus:outline-none" @click="toggleNotifMenu">
          <i class="fas fa-bell text-xl"></i>
          <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{{ notifications.length }}</span>
        </button>
        <div v-if="showNotifMenu" class="absolute right-0 mt-2 w-72 bg-white rounded shadow-lg z-50 p-4">
          <div class="font-semibold mb-2">Notifikasi</div>
          <div v-if="notifications.length === 0" class="text-gray-400 text-sm">Tidak ada notifikasi</div>
          <ul v-else class="divide-y divide-gray-200">
            <li v-for="notif in notifications" :key="notif.id" class="py-2 text-sm">
              <div class="font-medium">{{ notif.title }}</div>
              <div class="text-xs text-gray-500">{{ notif.time }}</div>
              <div class="text-gray-600">{{ notif.message }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="relative">
        <img src="https://i.pravatar.cc/40" class="w-8 h-8 rounded-full cursor-pointer border-2 border-indigo-500" @click="toggleUserMenu" />
        <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50 p-4">
          <div class="font-semibold mb-2">Harper Nelson</div>
          <div class="text-xs text-gray-500 mb-2">admin@mail.com</div>
          <button class="w-full text-left text-red-600 hover:underline" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const showUserMenu = ref(false)
const showNotifMenu = ref(false)

const notifications = ref([
  { id: 1, title: 'User Baru', message: 'User John berhasil mendaftar.', time: '1 menit lalu' },
  { id: 2, title: 'Order Masuk', message: 'Order #12345 telah diterima.', time: '10 menit lalu' },
  { id: 3, title: 'Akses Diubah', message: 'Hak akses user Anna diupdate.', time: '1 jam lalu' }
])

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) showNotifMenu.value = false
}
function toggleNotifMenu() {
  showNotifMenu.value = !showNotifMenu.value
  if (showNotifMenu.value) showUserMenu.value = false
}
function logout() {
  auth.logout()
  router.push('/login')
}

const menuMap = {
  '/dashboard': 'Dashboard',
  '/master/menus': 'List Menu',
  '/master/users': 'List User',
  '/master/access': 'List Akses',
  // tambahkan mapping lain jika perlu
}
const menuTitle = computed(() => menuMap[route.path] || 'Dashboard')

const breadcrumbs = computed(() => {
  const pathArr = route.path.split('/').filter(Boolean)
  const crumbs = []
  let acc = ''
  for (let i = 0; i < pathArr.length; i++) {
    acc += '/' + pathArr[i]
    let label = menuMap[acc] || pathArr[i].charAt(0).toUpperCase() + pathArr[i].slice(1)
    crumbs.push({ path: acc, label })
  }
  return crumbs
})
</script>
