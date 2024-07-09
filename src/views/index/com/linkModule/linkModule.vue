<template>
    <div class="linkModule">
        <!-- <img class="myLogo" src="@/assets/logo-desktop.png" /> -->
        <div class="title">{{ t(`t13`) }},<br>{{ t(`t15`) }}</div>
        <!-- 滚动数字 -->
        <p class="title">
            {{ t(`t14`) }}
        </p>
        <br/>
        <!-- <div class="link">
            <div class="linkItem">
                <a>如何参与</a>
            </div>
            <div class="linkItem">
                <a>指南</a>
            </div>
        </div> -->
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

</script>
<style lang="less" scoped>
@import "linkModule";
</style>