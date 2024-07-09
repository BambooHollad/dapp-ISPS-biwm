<template>
  <div class="wallet">
    <div class="content-box">
      <div class="wallet-box">
        <div class="wallet-item">
          <p>{{lang('余额')}}</p>
          <p>1200.22</p>
        </div>
        <div class="wallet-item">
          <p>ISPS</p>
          <p>0.00</p>
        </div>
      </div>
      <button class="withdrawal-btn">{{lang('提现')}}</button>
    </div>
    <div class="content-box">
      <div class="invite-box">
        <span>{{lang('邀请链接')}}</span>
        <i class="right-arrow-icon"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import lang from '@/i18n/index'
</script>
<style scoped lang="less">
@import "../styles/wallet.less";
</style>
