import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(MotionPlugin)
app.mount('#app')
