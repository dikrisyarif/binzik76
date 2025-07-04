<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
      <h2 class="text-xl font-bold text-indigo-700 tracking-wide"></h2>
      <button class="bg-indigo-600 text-white px-4 py-2 rounded shadow-lg shadow-indigo-300/50 hover:bg-indigo-700 transition flex items-center gap-1" @click="openForm = true">
        <span class="material-icons text-base">add</span>Add Access
      </button>
    </div>
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-indigo-50">
          <tr>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Access Name</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Status</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Create Date</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Created By</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="akses in pagedAkses" :key="akses.id" class="hover:bg-indigo-50">
            <td class="px-4 py-2 border">{{ akses.nama }}</td>
            <td class="px-4 py-2 border">{{ akses.status ? 'Active' : 'Inactive' }}</td>
            <td class="px-4 py-2 border">{{ akses.createdate }}</td>
            <td class="px-4 py-2 border">{{ akses.createdby }}</td>
            <td class="px-4 py-2 border flex gap-0.5 justify-center">
              <button class="bg-yellow-700 hover:bg-yellow-600 focus:ring-1 focus:ring-yellow-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0" title="View">
                <span class="material-icons text-[12px] leading-none text-white">visibility</span>
              </button>
              <button class="bg-blue-700 hover:bg-blue-600 focus:ring-1 focus:ring-blue-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0" @click="editAkses(akses)" title="Edit">
                <span class="material-icons text-[12px] leading-none text-white">edit</span>
              </button>
              <button class="bg-red-700 hover:bg-red-600 focus:ring-1 focus:ring-red-300 text-white rounded-full p-0.5 text-[9px] transition min-w-0 min-h-0" @click="deleteAkses(akses.id)" title="Delete">
                <span class="material-icons text-[12px] leading-none text-white">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="openForm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h3 class="text-lg font-bold mb-4">{{ editId ? 'Edit Access' : 'Add Access' }}</h3>
        <form @submit.prevent="saveAkses">
          <input v-model="form.nama" type="text" placeholder="Access Name" class="w-full border px-3 py-2 rounded mb-4" required />
          <div class="flex items-center mb-4">
            <label class="mr-2 text-sm">Status:</label>
            <select v-model="form.status" class="border rounded px-2 py-1">
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
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
      <div class="text-sm text-gray-500">Showing {{ pagedAkses.length }} of {{ filteredAkses.length }} access</div>
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
import { getRoles, createRole, updateRole, deleteRole } from '../../services/roleService'
import { useAuthStore } from '../../stores/auth'

const aksesList = ref([])
const openForm = ref(false)
const editId = ref(null)
const form = ref({ nama: '', status: true, createdate: '', createdby: '' })
const search = ref('')
const page = ref(1)
const pageSize = ref(5)
const authStore = useAuthStore()

const fetchAkses = async () => {
  aksesList.value = await getRoles()
}
onMounted(fetchAkses)

const filteredAkses = computed(() => {
  if (!search.value) return aksesList.value
  return aksesList.value.filter(a =>
    (a.nama && a.nama.toLowerCase().includes(search.value.toLowerCase())) ||
    (a.createdby && a.createdby.toLowerCase().includes(search.value.toLowerCase()))
  )
})

const totalPages = computed(() => {
  return Math.ceil(filteredAkses.value.length / pageSize.value)
})

const pagedAkses = computed(() => {
  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredAkses.value.slice(start, end)
})

function editAkses(akses) {
  editId.value = akses.id
  form.value = {
    nama: akses.nama,
    status: akses.status,
    createdate: akses.createdate,
    createdby: akses.createdby
  }
  openForm.value = true
}
async function deleteAkses(id) {
  if (!confirm('Yakin hapus akses?')) return
  await deleteRole(id)
  fetchAkses()
}
async function saveAkses() {
  console.log('saveAkses dipanggil');
  let createdby = 'admin'
  try {
    console.log('Cek sebelum ambil user dari localStorage');
    const userStr = localStorage.getItem('user')
    console.log('userStr:', userStr)
    if (userStr) {
      const user = typeof userStr === 'string' ? JSON.parse(userStr) : userStr
      console.log('User from localStorage:', user) // log semua data user
      createdby = user?.username || user?.name || user?.email || user?.user || 'admin'
    }
  } catch (e) {
    console.error('Error parsing user from localStorage:', e)
  }
  const payload = {
    nama: form.value.nama,
    status: form.value.status,
    createdate: form.value.createdate || new Date().toISOString().slice(0, 10),
    createdby
  }
  console.log('Payload yang dikirim:', payload)
  if (editId.value) {
    await updateRole(editId.value, payload)
  } else {
    await createRole(payload)
  }
  fetchAkses()
  closeForm()
}
function closeForm() {
  openForm.value = false
  editId.value = null
  form.value = { nama: '', status: true, createdate: '', createdby: '' }
}
</script>

<style>
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  -webkit-font-smoothing: antialiased;
}
</style>
