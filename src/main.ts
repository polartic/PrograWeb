import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)

//paquete para la impresion en excel
import JsonExcel from 'vue-json-excel3'
app.component('downloadExcel', JsonExcel)

app.use(router)

app.mount('#app')
