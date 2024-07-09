<template>
    <div class="containerModule">
        <h3>{{ t(`peopleInfo.t1`) }}</h3>
        <div class="moduleItemContainer">
            <div>
                <p>{{ t(`peopleInfo.t19`) }}</p>
                <span>V{{ userinfo.level }}</span>
            </div>
            <div>
                <p>{{ t(`peopleInfo.t4`) }}</p>
                <span>{{ userinfo.amount2 || "0" }} USDT</span>
            </div>
            <div>
                <p>{{ t(`peopleInfo.t22`) }}</p>
                <span>{{ userinfo.rewardWithdraw||"0" }} USDT</span>
            </div>
            <div>
                <p>{{ t(`peopleInfo.t23`) }}</p>
                <span>{{ userinfo.recommendRewardDhbTotal||"0" }}</span>
            </div>
            <div>
                <p>{{ t(`peopleInfo.t13`) }}</p>
                <span>{{ userinfo.withdrawAmount2||"0" }} USDT</span>
            </div>
            <div>
                <p>{{ t(`peopleInfo.t14`) }}</p>
                <span>{{ userinfo.balanceUsdt2||"0" }} USDT</span>
            </div>
            <div>
                <p></p>
                <a class="btn" @click="amount = ``; show = true">{{ t(`peopleInfo.t15`) }}</a>
            </div>
        </div>
    </div>
    <Dialog v-model:show="show" :title="t(`peopleInfo.t16`)" show-cancel-button @confirm="withdraw"
        :cancel-button-text="t(`t16`)" :confirm-button-text="t(`t17`)">
        <input v-model="amount" class="myInput" type="number" :placeholder="t(`peopleInfo.t17`)" />
    </Dialog>
</template>
<script setup lang="ts">
import request from "@/tools/request";
import userPerson from "@/pinia/person";
import { ETH } from "@/tools/contract";
import { Dialog, showFailToast } from "vant";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const person = userPerson();
const userinfo = $computed(() => person.userinfo);
const show = $ref(false);
let amount = $ref("");
const withdraw = async () => {
    if (!(Number(amount) >= 10)) {
        showFailToast(t(`peopleInfo.t17`));
        return;
    }
    if (Number(amount) > Number(userinfo.balanceUsdt2)) {
        showFailToast(t(`peopleInfo.t18`));
        return;
    }
    await request.post("app_server/withdraw", {
        amount: `${amount}`,
        type: "usdt_2",
        loading: true,
    }).then((res: any) => {
        if (res.status === "fail") showFailToast(t(`peopleInfo.t24`));
    })
    person.getuser();
}
</script>
<style lang="less" scoped>
@import "peopleInfo";
</style>