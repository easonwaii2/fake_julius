import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // Import Pinia
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './style.css'; // Keep global styles, or move to a dedicated file if preferred

const app = createApp(App);
const pinia = createPinia(); // Create Pinia instance

app.use(pinia); // Use Pinia
app.use(router);
app.use(ElementPlus);

app.mount('#app');
