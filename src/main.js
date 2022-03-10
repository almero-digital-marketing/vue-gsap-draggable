import { createApp } from 'vue'
import App from './App.vue'
import Draggable from './components/Draggable.vue'

const app = createApp(App)
app.component('Draggable', Draggable)
app.mount('#app')
