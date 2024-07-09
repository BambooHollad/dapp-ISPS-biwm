/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
declare module "framework7/lite-bundle";
declare module "framework7-vue/bundle";
declare module "vue3.0-clipboard";
declare module "vue-odometer";
