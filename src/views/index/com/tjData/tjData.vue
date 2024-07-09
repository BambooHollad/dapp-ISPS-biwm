<template>
    <div class="containerModule">
        <h3>{{ t(`tjData.t1`) }}</h3>
        <div class="moduleItemContainer">
            <!-- <div>
                <p>{{ t(`tjData.t2`) }}</p>
                <span>{{ getTimeDown }}</span>
            </div> -->
            <!-- <div>
                <p>{{ t(`tjData.t3`) }}</p>
                <span>{{ userinfo.feeDaily }} USDT</span>
            </div> -->
            <!-- <div>
                <p>{{ t(`tjData.t4`) }}</p>
                <span>{{ userinfo.locationCount }}</span>
            </div> -->
            <!-- <div>
                <p>{{ t(`tjData.t5`) }}</p>
                <span>{{ userinfo.balanceDhb }}</span>
            </div> -->
            <div>
                <p>{{ t(`tjData.t6`) }}</p>
                <span>{{ userinfo.totalDeposit }}</span>
            </div>
            <div>
                <p>{{ t(`tjData.t7`) }}</p>
                <span>{{ userinfo.withdrawAll||"0" }}</span>
            </div>
            <!-- <div>
                <p>{{ t(`tjData.t8`) }}</p>
                <span>{{ userinfo.poolAmount }}</span>
            </div> -->
            <!-- <div>
                <p>{{ t(`tjData.t14`) }}</p>
                <span>{{ userinfo.areaMaxAmount }}</span>
            </div>
            <div>
                <p>{{ t(`tjData.t12`) }}</p>
                <span>{{ userinfo.areaAmount }}</span>
            </div>
            <div>
                <p>{{ t(`tjData.t13`) }}</p>
                <span>{{ userinfo.recommendAreaTotal }}</span>
            </div> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import userPerson from "@/pinia/person";
import userSystem from "@/pinia/system";
import { Time } from "@/tools/myTIme";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const system = userSystem();
const person = userPerson();
const userinfo = $computed(() => person.userinfo);
const getTimeDown = $computed(() => {
    const endHours = 22;
    const date = new Date(system.CurrentTime * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const formateNum = (n: number) => n < 10 ? `0${n}` : n;
    if (hours < endHours) {
        const endTime = Date.parse(new Date(`${year}/${formateNum(month)}/${formateNum(day)} ${endHours}:00`).toString()) / 1000;
        const data = Time.getCountdown(endTime - system.CurrentTime)
        return `${data.hour}:${data.minute}:${data.second}`;
    } else {
        const endTime = Date.parse(new Date(`${year}/${formateNum(month)}/${formateNum(day + 1)} ${endHours}:00`).toString()) / 1000;
        const data = Time.getCountdown(endTime - system.CurrentTime)
        return `${data.hour}:${data.minute}:${data.second}`;
    }
})
</script>
<style lang="less" scoped>
@import "tjData";
</style>