import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import Dashboard from '../views/Dashboard.vue'
import ListMenu from '../views/master/ListMenu.vue'
import ListUser from '../views/master/ListUser.vue'
import ListAkses from '../views/master/ListAkses.vue'
import MainLayout from '../layouts/MainLayout.vue'
import MenuForm from '../views/master/MenuForm.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: AuthView },
  { path: '/register', component: AuthView },
  { path: '/reset-password', component: AuthView },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
      { path: 'master/menus', component: ListMenu, meta: { requiresAuth: true } },
      { path: 'master/menus/add', component: MenuForm, meta: { requiresAuth: true } },
      { path: 'master/menus/edit/:id', component: MenuForm, meta: { requiresAuth: true } },
      { path: 'master/users', component: ListUser, meta: { requiresAuth: true } },
      { path: 'master/access', component: ListAkses, meta: { requiresAuth: true } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // Optional: Validate token expiration if using JWT
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    // Optional: If token exists, you can add more validation here
    next()
  }
})

export default router
