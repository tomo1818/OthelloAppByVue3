import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
// bootstrap
import 'bootstrap/dist/css/bootstrap.css'; // add
import 'bootstrap-vue/dist/bootstrap-vue.css'; // add

createApp(App).use(store, key).use(router).mount('#app');
