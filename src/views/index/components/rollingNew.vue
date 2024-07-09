<template>
  <div class="rolling-new">
    <ul>
      <li>{{lang('时时价格')}}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import lang from '@/i18n/index'
import { f7 } from 'framework7-vue'

</script>
<style scoped lang="less">
@import "../styles/rollingNew.less";
</style>
