<template>
    <div class="languageView">
        <div v-for="(value, key) in lanArr" :key="key" @click="changeLanguage(value.lab)">
            <img :src="value.icon" />
        </div>
    </div>
</template>
<script setup lang="ts">
import zh from "@/assets/zh.png";
import en from "@/assets/en.png";
import els from "@/assets/els.png";
import hg from "@/assets/hg.png";
import tg from "@/assets/tg.png";
import xjp from "@/assets/xjp.png";
const lanArr = [
    { name: "中文", lab: "zh", icon: zh },
    { name: "英文", lab: "en", icon: en },
    { name: "俄罗斯", lab: "els", icon: els },
    { name: "韩国", lab: "hg", icon: hg },
    { name: "泰国", lab: "tg", icon: tg },
    { name: "新加坡", lab: "xjp", icon: xjp },
]
const changeLanguage = (name: string) => {
    localStorage.setItem("lan", name);
    location.reload();
}
</script>
<style lang="less" scoped>
@import "language";
</style>