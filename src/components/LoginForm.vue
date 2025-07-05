<template>
  <form @submit.prevent="submitLogin" class="space-y-7 w-full max-w-md mx-auto">
    <!-- Email -->
    <div class="relative">
      <input v-model="email" type="email" id="login-email" required
        class="peer input-group flex-1 outline-none text-base pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
      <label for="login-email"
        class="absolute left-3 top-1.5 text-gray-400 text-base transition-all duration-200 pointer-events-none
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600
        peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600
        bg-white px-1">
        Email
      </label>
      <div v-if="emailError" class="text-xs text-red-600 mt-1">{{ emailError }}</div>
    </div>
    <!-- Password -->
    <div class="relative">
      <input :type="showPassword ? 'text' : 'password'" v-model="password" id="login-password" required
        class="peer input-group flex-1 outline-none text-base pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
      <label for="login-password"
        class="absolute left-3 top-1.5 text-gray-400 text-base transition-all duration-200 pointer-events-none
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600
        peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600
        bg-white px-1">
        Password
      </label>
      <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none">
        <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
      </button>
      <div v-if="passwordError" class="text-xs text-red-600 mt-1">{{ passwordError }}</div>
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
            class="w-full py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition btn-animate text-base">
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
const showPassword = ref(false)
const emailError = ref('')
const passwordError = ref('')
const auth = useAuthStore()
const router = useRouter()

const validateEmail = (email) => {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)
}
const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password)
}

const submitLogin = async () => {
  emailError.value = ''
  passwordError.value = ''
  let valid = true
  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address!'
    valid = false
  }
  if (!validatePassword(password.value)) {
    passwordError.value = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character!'
    valid = false
  }
  if (!valid) return
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    passwordError.value = err.message || 'Login failed. Please check your credentials.'
  }
}

function goToRegister() {
  router.push('/register')
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
