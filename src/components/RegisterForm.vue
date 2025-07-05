<template>
  <form @submit.prevent="submitRegister" class="space-y-7">
    <!-- Username -->
    <div class="relative">
      <input v-model="username" id="register-username" required
        class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
      <label for="register-username"
        class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600
        peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600
        bg-white px-1">
        Username
      </label>
      <div v-if="usernameError" class="text-xs text-red-600 mt-1">{{ usernameError }}</div>
    </div>
    <!-- Full Name -->
    <div class="relative">
      <input v-model="fullname" id="register-fullname" required
        class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
      <label for="register-fullname"
        class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600
        peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600
        bg-white px-1">
        Full Name
      </label>
      <div v-if="fullnameError" class="text-xs text-red-600 mt-1">{{ fullnameError }}</div>
    </div>
    <!-- Notaty PT -->
    <div class="relative">
      <input v-model="NotatyPT" id="register-notatypt" required
        class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
      <label for="register-notatypt"
        class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600
        peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600
        bg-white px-1">
        Notaty PT
      </label>
      <div v-if="NotatyPTError" class="text-xs text-red-600 mt-1">{{ NotatyPTError }}</div>
    </div>
    <!-- Email -->
    <div class="relative">
      <input v-model="email" type="email" id="register-email" required
        class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
      <label for="register-email"
        class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600
        peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600
        bg-white px-1">
        Email
      </label>
      <div v-if="emailError" class="text-xs text-red-600 mt-1">{{ emailError }}</div>
    </div>
    <!-- Password -->
    <div class="relative">
      <input :type="showPassword ? 'text' : 'password'" v-model="password" id="register-password" required
        class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
      <label for="register-password"
        class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none
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
    <!-- Confirm Password -->
    <div class="relative">
      <input :type="showConfirm ? 'text' : 'password'" v-model="confirmPassword" id="register-confirm" required
        class="peer input-group flex-1 outline-none text-sm pt-5 pb-2 bg-transparent focus:ring-0 focus:outline-none" />
      <label for="register-confirm"
        class="absolute left-3 top-1.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600
        peer-valid:-top-3 peer-valid:text-xs peer-valid:text-indigo-600
        bg-white px-1">
        Confirm Password
      </label>
      <button type="button" @click="showConfirm = !showConfirm" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none">
        <i :class="showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
      </button>
      <div v-if="confirmPasswordError" class="text-xs text-red-600 mt-1">{{ confirmPasswordError }}</div>
    </div>
    <button type="submit"
            class="w-full py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition">
      Register
    </button>
    <div class="text-sm text-center text-gray-500">
      Already have an account?
      <a href="#" @click.prevent="goToLogin" class="text-indigo-600 font-medium hover:underline">Login here</a>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const fullname = ref('')
const NotatyPT = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role_id = ref(2) // default User
const status = ref(true)
const showPassword = ref(false)
const showConfirm = ref(false)
const usernameError = ref('')
const fullnameError = ref('')
const NotatyPTError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const auth = useAuthStore()
const router = useRouter()

const validateEmail = (email) => {
  // Simple email regex
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)
}

const validatePassword = (password) => {
  // Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password)
}

const submitRegister = async () => {
  usernameError.value = ''
  fullnameError.value = ''
  NotatyPTError.value = ''
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  let valid = true
  if (!username.value) {
    usernameError.value = 'Username is required!'
    valid = false
  }
  if (!fullname.value) {
    fullnameError.value = 'Full Name is required!'
    valid = false
  }
  if (!NotatyPT.value) {
    NotatyPTError.value = 'Notaty PT is required!'
    valid = false
  }
  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address!'
    valid = false
  }
  if (!validatePassword(password.value)) {
    passwordError.value = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character!'
    valid = false
  }
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match!'
    valid = false
  }
  if (!valid) return
  try {
    await auth.register({
      username: username.value,
      fullname: fullname.value,
      NotatyPT: NotatyPT.value,
      email: email.value,
      password: password.value,
      role_id: role_id.value,
      status: status.value
    })
    router.push('/dashboard')
  } catch (err) {
    emailError.value = err.message || 'Register failed. Please check your data.'
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
