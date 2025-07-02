<template>
  <div class="p-6 max-w-lg mx-auto">
    <h2 class="text-xl font-bold mb-4">{{ editId ? 'Edit Menu' : 'Tambah Menu' }}</h2>
    <form @submit.prevent="saveMenu">
      <div class="mb-3">
        <label class="block text-sm mb-1">Sort</label>
        <input v-model="form.sort" type="number" class="w-full border px-3 py-2 rounded" required />
      </div>
      <div class="mb-3">
        <label class="block text-sm mb-1">Level</label>
        <input v-model="form.level" type="number" class="w-full border px-3 py-2 rounded" required />
      </div>
      <div class="mb-3">
        <label class="block text-sm mb-1">Name</label>
        <input v-model="form.name" type="text" class="w-full border px-3 py-2 rounded" required />
      </div>
      <div class="mb-3">
        <label class="block text-sm mb-1">Route</label>
        <input v-model="form.route" type="text" class="w-full border px-3 py-2 rounded" required />
      </div>
      <div class="mb-3">
        <label class="block text-sm mb-1">Status</label>
        <select v-model="form.status" class="w-full border px-3 py-2 rounded">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="block text-sm mb-1">User</label>
        <input v-model="form.user" type="text" class="w-full border px-3 py-2 rounded" required />
      </div>
      <div class="flex justify-end gap-2">
        <button type="button" class="px-4 py-2" @click="cancel">Batal</button>
        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">Simpan</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const editId = ref(null)
const form = ref({ sort: '', level: '', name: '', route: '', status: 'active', user: '' })

function saveMenu() {
  // Simulasi simpan, bisa diintegrasi ke backend
  router.push('/master/menus')
}
function cancel() {
  router.push('/master/menus')
}
</script>
