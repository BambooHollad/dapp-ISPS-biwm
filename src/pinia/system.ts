import { defineStore } from "pinia";
let timeSwitch: any = null//系统时间更新定时器开关
export default defineStore("system", {
    state: () => ({
        CurrentTime: (Date.parse(new Date().toString())) / 1000, //当前系统时间
        BuyTime: 0,// 下单时间
    }),
    getters: {
        noBuy(): boolean {
            return this.CurrentTime < this.BuyTime
        }
    },
    actions: {
        initTime() {
            clearInterval(timeSwitch)
            timeSwitch = setInterval(() => this.getTime(), 1000)
        },
        /* 获取当前和本地够买时间 */
        getTime() {
            this.CurrentTime = (Date.parse(new Date().toString())) / 1000;
            const buytime: any = localStorage.getItem("buytime") || 0;
            this.BuyTime = Number(buytime);
        },
        setBuyTime() {
            /* 90s后解锁 */
            const time = 80;
            localStorage.setItem("buytime", `${this.CurrentTime + time}`);
        }
    }
})