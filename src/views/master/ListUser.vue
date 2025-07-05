<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
      <h2 class="text-xl font-bold text-indigo-700 tracking-wide"></h2>
      <div class="flex gap-2">
        <input v-model="search" type="text" placeholder="Search user..." class="border border-indigo-300 px-3 py-2 rounded focus:ring-2 focus:ring-indigo-200" />
        <button class="bg-indigo-600 text-white px-4 py-2 rounded shadow-lg shadow-indigo-300/50 hover:bg-indigo-700 transition flex items-center gap-1 btn-animate" @click="openForm = true">
          <span class="material-icons align-middle text-base mr-1">add</span>Add User
        </button>
      </div>
    </div>
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-indigo-50">
          <tr>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Username</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Full Name</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Notary/PT</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Email</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Role</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Status</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Update</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in pagedUsers" :key="user.id" class="hover:bg-indigo-50">
            <td class="px-4 py-2 border">{{ user.username }}</td>
            <td class="px-4 py-2 border">{{ user.fullname }}</td>
            <td class="px-4 py-2 border">{{ user.NotatyPT }}</td>
            <td class="px-4 py-2 border">{{ user.email }}</td>
            <td class="px-4 py-2 border">{{ getRoleName(user.role_id) }}</td>
            <td class="px-4 py-2 border">
              <span :class="user.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'" class="px-2 py-1 rounded text-xs font-semibold">
                {{ user.status ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-4 py-2 border text-xs">
              <div>{{ user.updated_at ? new Date(user.updated_at).toLocaleString() : '-' }}</div>
            </td>
            <td class="px-4 py-2 border flex gap-0.5 justify-center">
              <button class="bg-yellow-700 hover:bg-yellow-600 focus:ring-1 focus:ring-yellow-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0 btn-animate" title="View" @click="viewUser(user)">
                <span class="material-icons text-[12px] leading-none text-white">visibility</span>
              </button>
              <button class="bg-blue-700 hover:bg-blue-600 focus:ring-1 focus:ring-blue-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0 btn-animate" @click="editUser(user)" title="Edit">
                <span class="material-icons text-[12px] leading-none text-white">edit</span>
              </button>
              <button class="bg-red-700 hover:bg-red-600 focus:ring-1 focus:ring-red-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0 btn-animate" @click="deleteUser(user.id)" title="Delete">
                <span class="material-icons text-[12px] leading-none text-white">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="openForm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h3 class="text-lg font-bold mb-4">{{ editId ? 'Edit User' : 'Add User' }}</h3>
        <form @submit.prevent="saveUser">
          <div class="relative mb-2">
            <input v-model="form.username" id="user-username" required class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
            <label for="user-username" class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600 bg-white px-1">Username</label>
          </div>
          <div class="relative mb-2">
            <input v-model="form.fullname" id="user-fullname" required class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
            <label for="user-fullname" class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600 bg-white px-1">Full Name</label>
          </div>
          <div class="relative mb-2">
            <input v-model="form.NotatyPT" id="user-notatypt" required placeholder=" "
              class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
            <label for="user-notatypt"
              class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600
              peer-[.not-empty]:-top-3 peer-[.not-empty]:text-xs peer-[.not-empty]:text-indigo-600
              peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600
              bg-white px-1">
              Notary/PT
            </label>
          </div>
          <div class="relative mb-2">
            <input v-model="form.email" type="email" id="user-email" required class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
            <label for="user-email" class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600 bg-white px-1">Email</label>
          </div>
          <div v-if="!editId" class="relative mb-2">
            <input v-model="form.password" type="password" id="user-password" :required="!editId" class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
            <label for="user-password" class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600 bg-white px-1">Password</label>
          </div>
          <div class="relative mb-2">
            <select v-model="form.role_id" class="input-group w-full text-sm">
              <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.nama }}</option>
            </select>
          </div>
          <div class="relative mb-2">
            <select v-model="form.status" class="input-group w-full text-sm">
              <option :value="1">Active</option>
              <option :value="0">Inactive</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" class="mr-2 px-4 py-2" @click="closeForm">Cancel</button>
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-500">Showing {{ pagedUsers.length }} of {{ filteredUsers.length }} users</div>
      <nav v-if="totalPages > 1" class="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button :disabled="page===1" @click="page--"
          class="relative inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-50 disabled:opacity-50 shadow-lg shadow-indigo-200/60">
          <span class="material-icons text-base">chevron_left</span>
        </button>
        <span class="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-700">Page {{ page }} / {{ totalPages }}</span>
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
import { getRoles } from '../../services/roleService'
const users = ref([])
const roles = ref([])
const openForm = ref(false)
const editId = ref(null)
const form = ref({ username: '', fullname: '', NotatyPT: '', email: '', password: '', role_id: 1, status: 1 })
const search = ref('')
const page = ref(1)
const pageSize = ref(5)

const fetchUsers = async () => {
  users.value = await getUsers()
}
onMounted(async () => {
  await fetchUsers()
  roles.value = await getRoles()
})

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
  // Jangan set form.value.password, biarkan undefined agar input password tidak muncul
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
  if (editId.value) {
    // Jika password kosong saat edit, hapus field password agar tidak diupdate
    if (!payload.password) delete payload.password
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
function getRoleName(roleId) {
  const role = roles.value.find(r => r.id === roleId)
  return role ? role.nama : roleId
}
</script>

<style scoped>
.input-group {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  padding-left: 0.75rem;
  padding-right: 2.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px 0 rgba(99,102,241,0.10);
}
.input-group:focus-within, .input-group:hover {
  outline: 2px solid #6366f1;
  outline-offset: 0px;
  border-color: #6366f1;
  box-shadow: 0 2px 8px 0 rgba(99,102,241,0.18);
}
input:focus {
  outline: none;
  box-shadow: none;
}
</style>
