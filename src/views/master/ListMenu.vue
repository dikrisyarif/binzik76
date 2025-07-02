<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
      <h2 class="text-xl font-bold text-indigo-700 tracking-wide"></h2>
      <div class="flex gap-2">
        <input v-model="search" type="text" placeholder="Cari menu..." class="border border-indigo-300 px-3 py-2 rounded focus:ring-2 focus:ring-indigo-200" />
        <button class="bg-indigo-600 text-white px-4 py-2 rounded shadow-lg shadow-indigo-300/50 hover:bg-indigo-700 transition flex items-center gap-1" @click="goAdd">
          <span class="material-icons align-middle text-base mr-1">add</span>Tambah Menu
        </button>
      </div>
    </div>
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-indigo-50">
          <tr>
            <th class="px-2 py-2 border text-xs font-semibold text-gray-600">No</th>
            <th class="px-2 py-2 border text-xs font-semibold text-gray-600">ID</th>
            <th class="px-2 py-2 border text-xs font-semibold text-gray-600">Sort</th>
            <th class="px-2 py-2 border text-xs font-semibold text-gray-600">Level</th>
            <th class="px-2 py-2 border text-xs font-semibold text-gray-600">Name</th>
            <th class="px-2 py-2 border text-xs font-semibold text-gray-600">Route</th>
            <th class="px-2 py-2 border text-xs font-semibold text-gray-600">Status</th>
            <th class="px-2 py-2 border text-xs font-semibold text-gray-600">User</th>
            <th class="px-2 py-2 border text-xs font-semibold text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(menu, idx) in pagedMenus" :key="menu.id" class="hover:bg-indigo-50">
            <td class="px-2 py-2 border text-center">{{ (page-1)*perPage + idx + 1 }}</td>
            <td class="px-2 py-2 border text-center">{{ menu.id }}</td>
            <td class="px-2 py-2 border text-center">{{ menu.sort }}</td>
            <td class="px-2 py-2 border text-center">{{ menu.level }}</td>
            <td class="px-2 py-2 border">{{ menu.name }}</td>
            <td class="px-2 py-2 border">{{ menu.route }}</td>
            <td class="px-2 py-2 border text-center">
              <span :class="menu.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'" class="px-2 py-1 rounded text-xs font-semibold">
                {{ menu.status }}
              </span>
            </td>
            <td class="px-2 py-2 border text-center">{{ menu.user }}</td>
            <td class="px-2 py-2 border flex gap-0.5 justify-center">
              <button class="bg-yellow-700 hover:bg-yellow-600 focus:ring-1 focus:ring-yellow-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0" title="View">
                <span class="material-icons text-[12px] leading-none text-white">visibility</span>
              </button>
              <button class="bg-blue-700 hover:bg-blue-600 focus:ring-1 focus:ring-blue-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0" @click="goEdit(menu.id)" title="Edit">
                <span class="material-icons text-[12px] leading-none text-white">edit</span>
              </button>
              <button class="bg-red-700 hover:bg-red-600 focus:ring-1 focus:ring-red-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0" @click="deleteMenu(menu.id)" title="Delete">
                <span class="material-icons text-[12px] leading-none text-white">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-500">Menampilkan {{ pagedMenus.length }} dari {{ filteredMenus.length }} menu</div>
      <nav v-if="totalPages > 1" class="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button :disabled="page===1" @click="page--"
          class="relative inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-50 disabled:opacity-50 shadow-lg shadow-indigo-200/60">
          <span class="material-icons text-base">chevron_left</span>
        </button>
        <span class="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-700">Halaman {{ page }} / {{ totalPages }}</span>
        <button :disabled="page===totalPages" @click="page++"
          class="relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-50 disabled:opacity-50 shadow-lg shadow-indigo-200/60">
          <span class="material-icons text-base">chevron_right</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const menus = ref([
  { id: 1, sort: 1, level: 1, name: 'Dashboard', route: '/dashboard', status: 'active', user: 'System' },
  { id: 2, sort: 2, level: 1, name: 'Marketplace', route: '/marketplace', status: 'active', user: 'Admin' },
  { id: 3, sort: 3, level: 2, name: 'Orders', route: '/orders', status: 'inactive', user: 'Admin' },
  { id: 4, sort: 4, level: 2, name: 'Tracking', route: '/tracking', status: 'active', user: 'User' },
  { id: 5, sort: 5, level: 1, name: 'Customers', route: '/customers', status: 'active', user: 'System' },
  { id: 6, sort: 6, level: 2, name: 'Discounts', route: '/discounts', status: 'inactive', user: 'Admin' }
])
const search = ref('')
const page = ref(1)
const perPage = 5

const filteredMenus = computed(() => {
  if (!search.value) return menus.value
  return menus.value.filter(m =>
    m.name.toLowerCase().includes(search.value.toLowerCase()) ||
    m.route.toLowerCase().includes(search.value.toLowerCase())
  )
})
const totalPages = computed(() => Math.ceil(filteredMenus.value.length / perPage))
const pagedMenus = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredMenus.value.slice(start, start + perPage)
})

function goAdd() {
  router.push('/master/menus/add')
}
function goEdit(id) {
  router.push(`/master/menus/edit/${id}`)
}
function deleteMenu(id) {
  menus.value = menus.value.filter(m => m.id !== id)
}
</script>
