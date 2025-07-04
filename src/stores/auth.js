import { defineStore } from "pinia";
import { login as apiLogin, register as apiRegister, resetPassword as apiResetPassword } from '../services/authService'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(username, password) {
      const res = await apiLogin({ username, password })
      if (res.token) {
        this.token = res.token
        localStorage.setItem("token", res.token)
        this.user = res.user
        localStorage.setItem("user", JSON.stringify(res.user)) // simpan user ke localStorage
      } else {
        throw new Error(res.error || 'Login gagal')
      }
    },
    async register(data) {
      const res = await apiRegister(data)
      if (res.success) {
        // opsional: auto-login setelah register
        // await this.login(data.username, data.password)
        return true
      } else {
        throw new Error(res.error || 'Register gagal')
      }
    },
    async resetPassword(data) {
      const res = await apiResetPassword(data)
      if (!res.success) {
        throw new Error(res.error || 'Reset password gagal')
      }
      return true
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
    async fetchUser() {
      // opsional: fetch user dari backend pakai token
    },
  },
});
