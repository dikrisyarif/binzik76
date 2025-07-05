<template>
  <form @submit.prevent="submitReset" class="space-y-7">
    <div class="relative">
      <input v-model="email" type="email" id="reset-email" required
        class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
      <label for="reset-email"
        class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600
        peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600
        bg-white px-1">
        Email
      </label>
    </div>
    <button type="submit"
            class="w-full py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition">
      Reset Password
    </button>
    <div class="text-sm text-center text-gray-500">
      Remember your password?
      <a href="#" @click.prevent="goToLogin" class="text-indigo-600 font-medium hover:underline">Login here</a>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const auth = useAuthStore()
const router = useRouter()

const submitReset = async () => {
  try {
    await auth.resetPassword(email.value)
    alert('Reset link sent! Please check your email.')
  } catch (err) {
    alert(err.message || 'Reset failed. Please try again.')
  }
}

const goToLogin = () => {
  router.push('/login')
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
