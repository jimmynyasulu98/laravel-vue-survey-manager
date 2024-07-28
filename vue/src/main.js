
import store from './store'
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
