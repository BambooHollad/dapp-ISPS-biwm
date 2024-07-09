import { Component } from "vue";
import Index from "../views/index/index.vue";
import IdoDetails from '../views/ido/details.vue'
import Profile from '../views/profile/index.vue'
import Payment from '../views/payment/index.vue'
import Transfer from '../views/payment/transfer.vue'
import Link from '../views/share/link.vue'
import Count from '../views/share/count.vue'
import Withdrawal from '../views/withdrawal/index.vue'

// interface routeConfig {
//     path: string,
//     component: Component,
// }
// const route: {
//     [key: string]: Component,
// } = {
//     index,
// }
// const routes: Array<routeConfig> = Object.entries(route).map(([key, value], k) => ({
//     path: key === "index" ? `/` : `/${key}`,
//     component: value,
// }));
// 定义路由
const routes = [
    { path: '/', component: Index },
    { path: '/idoDetails', component: IdoDetails },
    { path: '/profile', component: Profile },
    { path: '/payment', component: Payment },
    { path: '/transfer', component: Transfer},
    { path: '/link', component: Link},
    { path: '/count', component: Count},
    { path: '/withdrawal', component: Withdrawal}
];

export default routes;