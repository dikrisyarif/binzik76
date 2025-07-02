<template>
  <form @submit.prevent="submitRegister" class="space-y-5">
    <div>
      <label class="text-sm text-gray-600">Name</label>
      <div class="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm">
        <i class="fas fa-user text-gray-400 mr-2"></i>
        <input v-model="name" type="text" placeholder="Enter your Name"
               class="flex-1 outline-none text-sm" required />
      </div>
    </div>
    <div>
      <label class="text-sm text-gray-600">Email</label>
      <div class="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm">
        <i class="fas fa-envelope text-gray-400 mr-2"></i>
        <input v-model="email" type="email" placeholder="Enter your Email"
               class="flex-1 outline-none text-sm" required />
      </div>
    </div>
    <div>
      <label class="text-sm text-gray-600">Password</label>
      <div class="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm relative">
        <i class="fas fa-lock text-gray-400 mr-2"></i>
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Enter your Password"
               class="flex-1 outline-none text-sm" required />
        <button type="button" @click="showPassword = !showPassword" class="absolute right-3 text-gray-400 focus:outline-none">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </button>
      </div>
    </div>
    <div>
      <label class="text-sm text-gray-600">Confirm Password</label>
      <div class="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm relative">
        <i class="fas fa-lock text-gray-400 mr-2"></i>
        <input :type="showConfirm ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirm your Password"
               class="flex-1 outline-none text-sm" required />
        <button type="button" @click="showConfirm = !showConfirm" class="absolute right-3 text-gray-400 focus:outline-none">
          <i :class="showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </button>
      </div>
    </div>
    <button type="submit"
            class="w-full py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition">
      Register
    </button>
    <div class="text-sm text-center text-gray-500">
      Already have an account?
      <a href="#" @click.prevent="$emit('switch-form', 'login')" class="text-indigo-600 font-medium hover:underline">Login here</a>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const auth = useAuthStore()
const router = useRouter()

const submitRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }
  try {
    await auth.register(name.value, email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    alert(err.message || 'Register failed. Please check your data.')
  }
}
</script>
