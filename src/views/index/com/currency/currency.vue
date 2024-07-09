<template>
    <div class="containerModule">
        <h3 class="currency-title">
            <span>{{ t(`tjData.t11`) }}</span>
            <span>{{ t(`tjData.t10`) }}</span>
            <span>{{ t(`tjData.t9`) }}</span>
        </h3>
        <div class="moduleItemContainer">
            <div>
                <p>FYB</p>
                <span :style="{ color }">{{ Number(userinfo.fybRate) }} %</span>
                <span>{{ userinfo.fybPrice }} $</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import userPerson from "@/pinia/person";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const person = userPerson();
const userinfo = $computed(() => person.userinfo);
const color = $computed(() => {
    if (Number(userinfo.fybRate) > 0) return "#00ff00"
    else if (Number(userinfo.fybRate) < 0) return "red"
    else return "gray"
})
</script>
<style lang="less" scoped>
@import "currency";
</style>