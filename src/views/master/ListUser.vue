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
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Username</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Nama Lengkap</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Notary/PT</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Email</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Role</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Status</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Update</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in pagedUsers" :key="user.id" class="hover:bg-indigo-50">
            <td class="px-4 py-2 border">{{ user.username }}</td>
            <td class="px-4 py-2 border">{{ user.fullname }}</td>
            <td class="px-4 py-2 border">{{ user.NotatyPT }}</td>
            <td class="px-4 py-2 border">{{ user.email }}</td>
            <td class="px-4 py-2 border">{{ user.role_nama || user.role_id }}</td>
            <td class="px-4 py-2 border">
              <span :class="user.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'" class="px-2 py-1 rounded text-xs font-semibold">
                {{ user.status ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-4 py-2 border text-xs">
              <div>{{ user.updated_at ? new Date(user.updated_at).toLocaleString() : '-' }}</div>
            </td>
            <td class="px-4 py-2 border flex gap-0.5 justify-center">
              <button class="bg-yellow-700 hover:bg-yellow-600 focus:ring-1 focus:ring-yellow-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0" title="View" @click="viewUser(user)">
                <span class="material-icons text-[12px] leading-none text-white">visibility</span>
              </button>
              <button class="bg-blue-700 hover:bg-blue-600 focus:ring-1 focus:ring-blue-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0" @click="editUser(user)" title="Edit">
                <span class="material-icons text-[12px] leading-none text-white">edit</span>
              </button>
              <button class="bg-red-700 hover:bg-red-600 focus:ring-1 focus:ring-red-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0" @click="deleteUser(user.id)" title="Delete">
                <span class="material-icons text-[12px] leading-none text-white">delete</span>
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
          <input v-model="form.username" type="text" placeholder="Username" class="w-full border px-3 py-2 rounded mb-2" required />
          <input v-model="form.fullname" type="text" placeholder="Nama Lengkap" class="w-full border px-3 py-2 rounded mb-2" required />
          <input v-model="form.NotatyPT" type="text" placeholder="Notary/PT" class="w-full border px-3 py-2 rounded mb-2" />
          <input v-model="form.email" type="email" placeholder="Email" class="w-full border px-3 py-2 rounded mb-2" required />
          <input v-model="form.password" type="password" placeholder="Password" class="w-full border px-3 py-2 rounded mb-2" :required="!editId" />
          <select v-model="form.role_id" class="w-full border px-3 py-2 rounded mb-2">
            <option value="1">Admin</option>
            <option value="2">User</option>
            <option value="3">Manager</option>
          </select>
          <select v-model="form.status" class="w-full border px-3 py-2 rounded mb-2">
            <option :value="1">Active</option>
            <option :value="0">Inactive</option>
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
import { ref, computed, onMounted } from 'vue'
import { getUsers, createUser, updateUser, deleteUser as apiDeleteUser } from '../../services/userService'
const users = ref([])
const openForm = ref(false)
const editId = ref(null)
const form = ref({ username: '', fullname: '', NotatyPT: '', email: '', password: '', role_id: 1, status: 1 })
const search = ref('')
const page = ref(1)
const pageSize = ref(5)

const fetchUsers = async () => {
  users.value = await getUsers()
}
onMounted(fetchUsers)

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter(u =>
    (u.username && u.username.toLowerCase().includes(search.value.toLowerCase())) ||
    (u.fullname && u.fullname.toLowerCase().includes(search.value.toLowerCase())) ||
    (u.email && u.email.toLowerCase().includes(search.value.toLowerCase()))
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

function viewUser(user) {
  // Optional: tampilkan detail user
}
function editUser(user) {
  editId.value = user.id
  form.value.username = user.username
  form.value.fullname = user.fullname
  form.value.NotatyPT = user.NotatyPT
  form.value.email = user.email
  form.value.password = ''
  form.value.role_id = user.role_id
  form.value.status = user.status ? 1 : 0
  openForm.value = true
}
async function deleteUser(id) {
  if (!confirm('Yakin hapus user?')) return
  await apiDeleteUser(id)
  fetchUsers()
}
async function saveUser() {
  const payload = { ...form.value }
  if (!payload.password) delete payload.password
  if (editId.value) {
    await updateUser(editId.value, payload)
  } else {
    await createUser(payload)
  }
  fetchUsers()
  closeForm()
}
function closeForm() {
  openForm.value = false
  editId.value = null
  form.value = { username: '', fullname: '', NotatyPT: '', email: '', password: '', role_id: 1, status: 1 }
}
</script>
