import { createApp } from 'vue'
import router from './routes/routes'
import './style.css'
import App from './App.vue'
import vue3GoogleLogin from "vue3-google-login";
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .use(vue3GoogleLogin, {
        clientId:
          "317627420832-9i9fjr23mdcpcl1nd15s6rv0c3dk0fjd.apps.googleusercontent.com",
      })
    .mount('#app')
