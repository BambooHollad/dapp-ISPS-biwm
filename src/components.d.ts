import * as type from './components/components';
import { f7Page, f7PageContent, f7Navbar, f7NavRight, f7Toolbar, f7Link, f7Preloader } from "framework7-vue";
declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        Container: typeof type.Container;
        BorderCard: typeof type.BorderCard;
        Toggle: typeof type.Toggle;
        Login: typeof type.Login;
    }
}

/* f7 常用组件注册 */
declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        "f7-page": typeof f7Page;
        "f7-page-content": typeof f7PageContent;
        "f7-navbar": typeof f7Navbar;
        "f7-nav-right": typeof f7NavRight;
        "f7-toolbar": typeof f7Toolbar;
        "f7-link": typeof f7Link;
        "f7-preloader": typeof f7Preloader;
    }
}