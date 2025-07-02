import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(email, password) {
      this.token = "dummy-token";
      localStorage.setItem("token", this.token);
      this.user = {
        name: email.split("@")[0],
        email: email,
        role: "tester",
      };
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
    async fetchUser() {
      if (this.token) {
        this.user = {
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        };
      }
    },
  },
});
