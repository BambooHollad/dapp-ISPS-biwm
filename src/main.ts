import "lib-flexible/flexible.js";
import { createApp } from 'vue';
import "framework7/less/bundle";
import "./style/index.less";
import 'vant/lib/index.css';
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';
Framework7.use(Framework7Vue);
import i18n from "./language";
import vue3Clipboard from 'vue3.0-clipboard';
import directive from "./directive";
import pinia from './pinia'
import App from './App.vue';
import Antd from 'ant-design-vue';
import regComponents from "./components/index";
// import { windowPlugin } from "@plaoc/plugins";

const app = createApp(App);
app.use(i18n);
app.use(pinia);
app.use(vue3Clipboard);
registerComponents(app);
regComponents(app);
directive(app);
app.use(Antd).mount('#app')

// await windowPlugin.setBounds(false, 300, 400);