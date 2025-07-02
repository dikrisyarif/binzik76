<template>
  <aside :class="['bg-white border-r h-screen flex flex-col transition-all duration-300', isCollapsed ? 'w-20' : 'w-64']">
    <div class="p-4 flex items-center justify-between border-b">
      <span class="text-xl font-bold tracking-wide text-indigo-700" v-if="!isCollapsed">MLCI</span>
      <button @click="toggleSidebar" class="p-1 rounded hover:bg-gray-100">
        <span class="material-icons text-base">{{ isCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
      </button>
    </div>
    <nav class="flex-1 overflow-y-auto px-2 py-4">
      <ul class="space-y-1">
        <li v-for="item in menus" :key="item.label">
          <template v-if="!item.children">
            <router-link
              :to="item.route"
              class="flex items-center gap-3 p-2 rounded-lg transition hover:bg-indigo-50 text-gray-700 font-medium"
              active-class="bg-indigo-100 text-indigo-700"
            >
              <span class="material-icons text-base">{{ item.icon }}</span>
              <span v-if="!isCollapsed">{{ item.label }}</span>
            </router-link>
          </template>
          <template v-else>
            <div class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-indigo-50 text-gray-700 font-medium select-none"
                 @click="toggleDropdown(item)">
              <span class="material-icons text-base">{{ item.icon }}</span>
              <span v-if="!isCollapsed">{{ item.label }}</span>
              <span class="material-icons ml-auto text-sm" v-if="!isCollapsed">{{ item.open ? 'expand_less' : 'expand_more' }}</span>
            </div>
            <ul v-show="item.open && !isCollapsed" class="pl-7 py-1 space-y-1">
              <li v-for="child in item.children" :key="child.label">
                <router-link
                  :to="child.route"
                  class="flex items-center gap-3 p-2 rounded-lg transition hover:bg-indigo-100 text-gray-600"
                  active-class="bg-indigo-200 text-indigo-700"
                >
                  <span class="material-icons text-sm">{{ child.icon }}</span>
                  <span>{{ child.label }}</span>
                </router-link>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </nav>
    <div class="p-4 border-t">
      <div v-if="!isCollapsed" class="text-sm mb-2 text-gray-500">Harper Nelson</div>
      <button class="flex items-center gap-2 p-2 rounded hover:bg-red-100 text-red-700 w-full justify-center" @click="auth.logout(); router.push('/login')">
        <span class="material-icons text-base">logout</span>
        <span v-if="!isCollapsed">Logout</span> 
      </button> 
    </div>
  </aside>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const menus = reactive([
  { label: 'Dashboard', icon: 'dashboard', route: '/' },
  { label: 'Marketplace', icon: 'store', route: '/marketplace' },
  { label: 'Orders', icon: 'shopping_cart', route: '/orders' },
  { label: 'Tracking', icon: 'location_on', route: '/tracking' },
  { label: 'Customers', icon: 'people', route: '/customers' },
  { label: 'Discounts', icon: 'percent', route: '/discounts' },
  {
    label: 'Master',
    icon: 'settings',
    open: false,
    children: [
      { label: 'Users', icon: 'person', route: '/master/users' },
      { label: 'Menu & Access', icon: 'menu', route: '/master/menus' },
      { label: 'User Roles', icon: 'vpn_key', route: '/master/access' }
    ]
  }
])

function toggleDropdown(item) {
  item.open = !item.open
}
</script>
