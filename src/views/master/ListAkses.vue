<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
      <h2 class="text-xl font-bold text-indigo-700 tracking-wide"></h2>
      <button class="bg-indigo-600 text-white px-4 py-2 rounded shadow-lg shadow-indigo-300/50 hover:bg-indigo-700 transition flex items-center gap-1" @click="openForm = true">
        <span class="material-icons text-base">add</span>Tambah Akses
      </button>
    </div>
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-indigo-50">
          <tr>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Nama Akses</th>
            <th class="px-4 py-2 border text-xs font-semibold text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="akses in pagedAkses" :key="akses.id" class="hover:bg-indigo-50">
            <td class="px-4 py-2 border">{{ akses.name }}</td>
            <td class="px-4 py-2 border flex gap-1 justify-center">
              <button class="bg-yellow-700 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 text-white shadow-md rounded-full p-1.5 text-xs transition" title="View">
                <span class="material-icons text-xs text-white">visibility</span>
              </button>
              <button class="bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 text-white shadow-md rounded-full p-1.5 text-xs transition" @click="editAkses(akses)" title="Edit">
                <span class="material-icons text-xs text-white">edit</span>
              </button>
              <button class="bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-red-300 text-white shadow-md rounded-full p-1.5 text-xs transition" @click="deleteAkses(akses.id)" title="Delete">
                <span class="material-icons text-xs text-white">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="openForm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h3 class="text-lg font-bold mb-4">{{ editId ? 'Edit Akses' : 'Tambah Akses' }}</h3>
        <form @submit.prevent="saveAkses">
          <input v-model="form.name" type="text" placeholder="Nama Akses" class="w-full border px-3 py-2 rounded mb-4" required />
          <div class="flex justify-end">
            <button type="button" class="mr-2 px-4 py-2" @click="closeForm">Batal</button>
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">Simpan</button>
          </div>
        </form>
      </div>
    </div>
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-500">Menampilkan {{ pagedAkses.length }} dari {{ filteredAkses.length }} akses</div>
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
const aksesList = ref([
  { id: 1, name: 'Admin' },
  { id: 2, name: 'User' }
])
const openForm = ref(false)
const editId = ref(null)
const form = ref({ name: '' })
const page = ref(1)
const pageSize = ref(5)
const totalPages = ref(Math.ceil(aksesList.value.length / pageSize.value))

function editAkses(akses) {
  editId.value = akses.id
  form.value.name = akses.name
  openForm.value = true
}
function deleteAkses(id) {
  aksesList.value = aksesList.value.filter(a => a.id !== id)
  totalPages.value = Math.ceil(aksesList.value.length / pageSize.value)
}
function saveAkses() {
  if (editId.value) {
    const idx = aksesList.value.findIndex(a => a.id === editId.value)
    if (idx !== -1) aksesList.value[idx].name = form.value.name
  } else {
    aksesList.value.push({ id: Date.now(), name: form.value.name })
  }
  totalPages.value = Math.ceil(aksesList.value.length / pageSize.value)
  closeForm()
}
function closeForm() {
  openForm.value = false
  editId.value = null
  form.value.name = ''
}
const pagedAkses = computed(() => {
  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value
  return aksesList.value.slice(start, end)
})
const filteredAkses = computed(() => {
  return aksesList.value
})
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
