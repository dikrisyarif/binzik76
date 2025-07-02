<template>
  <form @submit.prevent="submitLogin" class="space-y-5">
    <!-- Email -->
    <div>
      <label class="text-sm text-gray-600">Email</label>
      <div class="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm">
        <i class="fas fa-envelope text-gray-400 mr-2"></i>
        <input v-model="email" type="email" placeholder="Enter your Email"
               class="flex-1 outline-none text-sm" required />
      </div>
    </div>
    <!-- Password -->
    <div>
      <label class="text-sm text-gray-600">Password</label>
      <div class="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm">
        <i class="fas fa-lock text-gray-400 mr-2"></i>
        <input v-model="password" type="password" placeholder="Enter your Password"
               class="flex-1 outline-none text-sm" required />
      </div>
    </div>
    <!-- Remember & Forgot -->
    <div class="flex justify-between items-center text-sm text-gray-600">
      <label class="flex items-center">
        <input type="checkbox" class="mr-1" /> Remember Me
      </label>
      <router-link to="/reset-password" class="text-indigo-600 hover:underline">Forgot Password?</router-link>
    </div>
    <!-- Login Button -->
    <button type="submit"
            class="w-full py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition">
      Login
    </button>
    <div class="text-center text-sm text-gray-400">Or</div>
    <!-- Register Link -->
    <div class="text-sm text-center text-gray-500">
      Don’t have an account?
      <a href="#" @click.prevent="goToRegister" class="text-indigo-600 font-medium hover:underline">Create here</a>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const submitLogin = async () => {
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    alert(err.message || 'Login failed. Please check your credentials.')
  }
}

function goToRegister() {
  router.push('/register')
}
</script>
