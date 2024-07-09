<template>
  <div class="staking">
    <div class="staking-banner"></div>
    <div class="staking-amount">
      <div class="staking-amount-item">
        <div class="staking-amount-title">ISPS {{lang('余额')}}</div>
        <div class="staking-amount-number">{{userinfo.balanceBiw}}</div>
      </div>
      <div class="staking-amount-item">
        <div class="staking-amount-title">KEY {{lang('余额')}}</div>
        <div class="staking-amount-number">0</div>
      </div>
    </div>
    <div class="staking-box">
      <div class="staking-box-head">
        <div class="staking-head-title">
          <i class="staking-head-title-avatar">B</i>ISPS({{lang('永续')}})
        </div>
        <f7-button class="staking-button" fill @click="showToastTop">{{lang('金库')}}</f7-button>
      </div>
      <div class="staking-box-content content-line">
        <div class="staking-box-content-item">
          <div class="staking-box-content-data" style="color: #FFF">KEY</div>
          <div class="staking-box-content-title">{{lang('赚取')}}</div>
        </div>
        <div class="staking-box-content-item">
          <div class="staking-box-content-data" style="color: #25eeb1">0/s</div>
          <div class="staking-box-content-title">{{lang('产出速度')}}</div>
        </div>
      </div>
      <div class="staking-box-content">
        <div class="staking-box-content-item">
          <div class="staking-box-content-data" style="color: #FFF">ISPS</div>
          <div class="staking-box-content-title">{{lang('赚取')}}</div>
        </div>
        <div class="staking-box-content-item">
          <div class="staking-box-content-data" style="color: #25eeb1">0/s</div>
          <div class="staking-box-content-title">{{lang('产出速度')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { f7 } from 'framework7-vue'
import lang from '@/i18n/index'
import userPerson from "@/pinia/person";

const person = userPerson();
const userinfo = $computed(() => person.userinfo);

let toast: any = $ref(null)

const showToastTop = () => {
  console.log(333)
  toast = f7.toast.create({
    text: lang('暂未开放该功能'),
    position: 'top',
    closeTimeout: 2000,
  });
  toast.open();
}
</script>
<style scoped lang="less">
@import "../styles/staking.less";
</style>
