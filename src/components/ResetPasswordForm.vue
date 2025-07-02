<template>
  <form @submit.prevent="submitReset" class="space-y-5">
    <div>
      <label class="text-sm text-gray-600">Email</label>
      <div class="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm">
        <i class="fas fa-envelope text-gray-400 mr-2"></i>
        <input v-model="email" type="email" placeholder="Enter your Email"
               class="flex-1 outline-none text-sm" required />
      </div>
    </div>
    <button type="submit"
            class="w-full py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition">
      Reset Password
    </button>
    <div class="text-sm text-center text-gray-500">
      Remember your password?
      <a href="#" @click.prevent="$emit('switch-form', 'login')" class="text-indigo-600 font-medium hover:underline">Login here</a>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const auth = useAuthStore()

const submitReset = async () => {
  try {
    await auth.resetPassword(email.value)
    alert('Reset link sent! Please check your email.')
  } catch (err) {
    alert(err.message || 'Reset failed. Please try again.')
  }
}
</script>
