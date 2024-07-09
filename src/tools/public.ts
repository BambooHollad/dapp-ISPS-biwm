import { f7 } from "framework7-vue";

/* f7相关 */
export class F7 {
    /* 路由跳转 */
    public static to(path: string, query: any = {}) {
        f7.views.main.router.navigate({
            path:path,
            query
        })
    }
    /* 返回 */
    public static back() {
        f7.views.main.router.back();
    }
}