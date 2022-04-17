import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import './assets/styles/index.styl';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import * as ElIconModules from '@element-plus/icons-vue';

const app = createApp(App);

// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName];
    app.component(iconName, item);
  }
}

app.use(ElementPlus).mount('#app');