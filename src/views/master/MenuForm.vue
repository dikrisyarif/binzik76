<template>
  <div v-if="openForm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-sm">
      <h3 class="text-lg font-bold mb-4">{{ editId ? 'Edit Menu' : 'Add Menu' }}</h3>
      <form @submit.prevent="saveMenu">
        <div class="relative mb-2">
          <input v-model="form.sort" id="menu-sort" type="number" required placeholder=" "
            class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
          <label for="menu-sort" class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600 bg-white px-1">Sort</label>
        </div>
        <div class="relative mb-2">
          <input v-model="form.level" id="menu-level" type="number" required placeholder=" "
            class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
          <label for="menu-level" class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600 bg-white px-1">Level</label>
        </div>
        <div class="relative mb-2">
          <input v-model="form.name" id="menu-name" type="text" required placeholder=" "
            class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
          <label for="menu-name" class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600 bg-white px-1">Name</label>
        </div>
        <div class="relative mb-2">
          <input v-model="form.route" id="menu-route" type="text" required placeholder=" "
            class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
          <label for="menu-route" class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600 bg-white px-1">Route</label>
        </div>
        <div class="relative mb-2">
          <select v-model="form.status" id="menu-status" required class="input-group w-full text-sm">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div class="relative mb-2">
          <input v-model="form.user" id="menu-user" type="text" required placeholder=" "
            class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
          <label for="menu-user" class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600 bg-white px-1">User</label>
        </div>
        <div class="flex justify-end">
          <button type="button" class="mr-2 px-4 py-2" @click="$emit('close')">Cancel</button>
          <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  openForm: Boolean,
  editId: [Number, null],
  form: Object
})
const emit = defineEmits(['close', 'save'])

function saveMenu() {
  emit('save')
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
