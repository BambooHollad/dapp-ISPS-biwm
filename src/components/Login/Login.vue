<template>
    <div class="login-view">
        <div class="loading">
            <!-- <img src="@/assets/vue.svg" /> -->
            <div class="loading-text">
                <f7-preloader color="white" />
                <div v-if="person.loadAccount">{{lang('合约验证中')}}</div>
                <div v-else>{{lang('钱包连接中')}}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import userPerson from "@/pinia/person";
import lang from '@/i18n/index'

const person = userPerson();
</script>
<style scoped lang="less">
@import "Login";
</style>