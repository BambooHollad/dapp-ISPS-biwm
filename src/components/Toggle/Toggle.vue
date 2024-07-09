<template>
    <div @click="changeLanguage(locale === `zh` ? `en` : `zh`)" class="toggle-view">
        <div :class="{ isEn: locale === `en` }" />
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const changeLanguage = (name: string) => {
    localStorage.setItem("lan", name);
    location.reload();
}
</script>
<style scoped lang="less">
@import "Toggle";
</style>