import { createApp } from 'vue'
import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'
import './css/app.css'
import App from './App.vue'

createApp(App)
  .use(Quasar, { config: { brand: { primary: '#03328d', secondary: '#d8f36a' } } })
  .mount('#app')
