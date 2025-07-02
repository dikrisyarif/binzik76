<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
      <h2 class="text-xl font-bold text-indigo-700 tracking-wide"></h2>
      <div class="flex gap-2">
        <input v-model="search" type="text" placeholder="Cari user..." class="border border-indigo-300 px-3 py-2 rounded focus:ring-2 focus:ring-indigo-200" />
        <button class="bg-indigo-600 text-white px-4 py-2 rounded shadow-lg shadow-indigo-300/50 hover:bg-indigo-700 transition flex items-center gap-1" @click="openForm = true">
          <span class="material-icons align-middle text-base mr-1">add</span>Tambah User
        </button>
      </div>
    </div>
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-indigo-50">
          <tr>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Email</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Nama</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Role</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Status</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Update</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in pagedUsers" :key="user.id" class="hover:bg-indigo-50">
            <td class="px-4 py-2 border">{{ user.email }}</td>
            <td class="px-4 py-2 border">{{ user.name }}</td>
            <td class="px-4 py-2 border">{{ user.role }}</td>
            <td class="px-4 py-2 border">
              <span :class="user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'" class="px-2 py-1 rounded text-xs font-semibold">
                {{ user.status }}
              </span>
            </td>
            <td class="px-4 py-2 border text-xs">
              <div>by: {{ user.updateBy }}</div>
              <div>{{ user.updateDate }}</div>
            </td>
            <td class="px-4 py-2 border flex gap-1 justify-center">
              <button class="bg-yellow-700 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 text-white shadow-md rounded-full p-1.5 text-xs transition" title="View">
                <span class="material-icons text-xs text-white">visibility</span>
              </button>
              <button class="bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 text-white shadow-md rounded-full p-1.5 text-xs transition" @click="editUser(user)" title="Edit">
                <span class="material-icons text-xs text-white">edit</span>
              </button>
              <button class="bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-red-300 text-white shadow-md rounded-full p-1.5 text-xs transition" @click="deleteUser(user.id)" title="Delete">
                <span class="material-icons text-xs text-white">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="openForm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h3 class="text-lg font-bold mb-4">{{ editId ? 'Edit User' : 'Tambah User' }}</h3>
        <form @submit.prevent="saveUser">
          <input v-model="form.name" type="text" placeholder="Nama" class="w-full border px-3 py-2 rounded mb-2" required />
          <input v-model="form.email" type="email" placeholder="Email" class="w-full border px-3 py-2 rounded mb-2" required />
          <select v-model="form.role" class="w-full border px-3 py-2 rounded mb-2">
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Manager">Manager</option>
          </select>
          <select v-model="form.status" class="w-full border px-3 py-2 rounded mb-2">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div class="flex justify-end">
            <button type="button" class="mr-2 px-4 py-2" @click="closeForm">Batal</button>
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">Simpan</button>
          </div>
        </form>
      </div>
    </div>
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-500">Menampilkan {{ pagedUsers.length }} dari {{ filteredUsers.length }} user</div>
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
const users = ref([
  { id: 1, name: 'Admin', email: 'admin@mail.com', role: 'Admin', status: 'active', updateBy: 'System', updateDate: '2025-07-01 10:00' },
  { id: 2, name: 'User', email: 'user@mail.com', role: 'User', status: 'inactive', updateBy: 'Admin', updateDate: '2025-07-01 09:00' }
])
const openForm = ref(false)
const editId = ref(null)
const form = ref({ name: '', email: '', role: 'User', status: 'active' })
const search = ref('')
const page = ref(1)
const pageSize = ref(5)

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter(u =>
    u.name.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email.toLowerCase().includes(search.value.toLowerCase())
  )
})

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / pageSize.value)
})

const pagedUsers = computed(() => {
  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredUsers.value.slice(start, end)
})

function editUser(user) {
  editId.value = user.id
  form.value.name = user.name
  form.value.email = user.email
  form.value.role = user.role
  form.value.status = user.status
  openForm.value = true
}
function deleteUser(id) {
  users.value = users.value.filter(u => u.id !== id)
}
function saveUser() {
  if (editId.value) {
    const idx = users.value.findIndex(u => u.id === editId.value)
    if (idx !== -1) {
      users.value[idx].name = form.value.name
      users.value[idx].email = form.value.email
      users.value[idx].role = form.value.role
      users.value[idx].status = form.value.status
      users.value[idx].updateBy = 'Admin'
      users.value[idx].updateDate = new Date().toISOString().slice(0, 16).replace('T', ' ')
    }
  } else {
    users.value.push({
      id: Date.now(),
      name: form.value.name,
      email: form.value.email,
      role: form.value.role,
      status: form.value.status,
      updateBy: 'Admin',
      updateDate: new Date().toISOString().slice(0, 16).replace('T', ' ')
    })
  }
  closeForm()
}
function closeForm() {
  openForm.value = false
  editId.value = null
  form.value.name = ''
  form.value.email = ''
  form.value.role = 'User'
  form.value.status = 'active'
}
</script>
