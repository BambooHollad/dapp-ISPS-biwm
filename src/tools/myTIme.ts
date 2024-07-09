/*时间格式化*/
export class Time {
    static formateNum: Function = (n: number) => n < 10 ? `0${n}` : n
    // 获取倒计时
    static getCountdown(n: number): any {
        let num = Number(n) > 0 ? Number(n) : 0;
        let hour: number = Math.floor(num / 3600);
        let minute: number = Math.floor((num - (hour * 3600)) / 60)
        let second: number = num - (hour * 3600) - (minute * 60)
        return {
            hour: Time.formateNum(hour),
            minute: Time.formateNum(minute),
            second: Time.formateNum(second),
        }
    }
}