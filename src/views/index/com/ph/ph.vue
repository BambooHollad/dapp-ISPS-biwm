<template>
    <div class="containerModule">
        <h3>{{ t(`ph.t1`) }}</h3>
        <div class="moduleItemContainer">
            <div>
                <p class="address">{{ t(`ph.t2`) }}</p>
                <p class="trx">USDT</p>
                <p class="get">{{ t(`ph.t3`) }}</p>
            </div>
            <div v-for="(value, key) in topUser" :key="key">
                <p class="address">
                    {{ ETH.format_address(value.account) }}
                </p>
                <p class="trx">{{ value.recommendReward }}</p>
                <p class="get">
                    {{ value.reward }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ETH } from "@/tools/contract";
import userPerson from "@/pinia/person";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const person = userPerson();
const userinfo = $computed(() => person.userinfo);
const topUser: Array<any> = $computed(() => userinfo.topUser);
</script>
<style lang="less" scoped>
@import "ph";
</style>