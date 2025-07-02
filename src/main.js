import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/main.css'
import 'material-icons/iconfont/material-icons.css' // ⬅️ penting

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
