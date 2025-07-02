<template>
  <AuthLayout>
    <component :is="currentFormComponent" @switch-form="switchForm" />
  </AuthLayout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from '../components/layout/AuthLayout.vue'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
import ResetPasswordForm from '../components/ResetPasswordForm.vue'

const route = useRoute()
const form = ref('login')

const formMap = {
  login: LoginForm,
  register: RegisterForm,
  reset: ResetPasswordForm
}

const currentFormComponent = computed(() => formMap[form.value])

function switchForm(target) {
  form.value = target
}

// Sync form with route
watch(
  () => route.path,
  (path) => {
    if (path === '/login') form.value = 'login'
    else if (path === '/register') form.value = 'register'
    else if (path === '/reset-password') form.value = 'reset'
    else form.value = 'login'
  },
  { immediate: true }
)
</script>

<style scoped>
.backimage{
    background-color: #E8DBEC;
}
</style>
