<template>
    <div class="join-module">
        <h2 class="title">{{ t(`join.t1`) }}</h2>
        <div class="join">
            <div class="inputCon">
                <span class="num">{{ num }}</span>
                <span>USDT</span>
            </div>
            <br />
            <!-- 操作按鈕 -->
            <div class="ctrlContainer">
                <div @click="num = 0">{{ t(`join.t2`) }}</div>
                <div class="joinBtn" :class="{ disabled: loading || num === 0 || isRuning }"
                    @click="approved ? transferUsdt() : approve()">{{ approved ? t(`join.t1`) : t(`join.t6`) }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Contract, ETH } from "@/tools/contract";
import userPerson from "@/pinia/person";
import userSystem from "@/pinia/system";
import { showDialog } from "vant";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const system = userSystem();
const person = userPerson();
const userinfo = $computed(() => person.userinfo);
const num = $ref(100);
const USDT: Contract = new Contract(import.meta.env.VITE_USDT, "ERC20");
const ISPS: Contract = new Contract(import.meta.env.VITE_ISPS, "ERC20");
const BUY: Contract = new Contract(import.meta.env.VITE_BUY1, "BUY");
let loading = $ref(true);
let approved = $ref(false);
const isRuning = $computed(()=>{
    return userinfo.LocationList.filter((v:any)=>Number(v.amount)<Number(v.amountMax)).length > 0;
})
/* 获取授权 */
const getApproved = async () => {
    let res = await USDT.call("allowance", [ETH.account, BUY.address]);
    approved = Number(res) > 0;
    loading = false;
}
const approve = async () => {
    loading = true;
    try {
        const usdtRes = await USDT.send("approve", [
            BUY.address,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        ])

        const ispsRes = await ISPS.send("approve", [
            BUY.address,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        ])

        console.log('usdtRes', ispsRes)
    } catch (error) {
        console.log(error)
    }
}
/* USDT转账 */
const transferUsdt = async () => {
    loading = true;
    BUY.send("buy", [1]).then(() => {
        loading = false;
        system.setBuyTime();
        showDialog({
            title: t(`join.t3`),
            message: `USDT ${t(`join.t4`)}`,
            theme: 'round-button',
            confirmButtonColor: "#44bf7b",
            confirmButtonText: t(`join.t5`),
        })
    }).catch(() => loading = false);
}
getApproved()
</script>
<style lang="less" scoped>
@import "join";
</style>