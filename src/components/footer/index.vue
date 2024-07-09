<template>
  <div class="footer">
    <div class="footer-item" :class="{'active': menu === 1}" @click="changeMenu(1)">
      <i class="home-icon"></i>
      <p>{{lang('首页')}}</p>
    </div>
    <div class="footer-item" :class="{'active': menu === 2}" @click="changeMenu(2)">
      <i class="deal-icon"></i>
      <p>{{lang('交易')}}</p>
    </div>
    <div class="footer-item" :class="{'active': menu === 5}" @click="changeMenu(5)">
      <i class="staking-icon"></i>
      <p>{{lang('质押')}}</p>
    </div>
    <div class="footer-item" :class="{'active': menu === 4}" @click="changeMenu(4)">
      <i class="my-icon"></i>
      <p>{{lang('我的')}}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import lang from '@/i18n/index'
let menu = $ref(1)

const emits = defineEmits(['menuChange'])

const changeMenu = (index: number) => {
  menu = index
  emits('menuChange', index)
}
</script>
<style scoped lang="less">
@import "index";
</style>
