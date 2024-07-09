<template>
  <div class="exchange-modal">
    <div class="exchange-main scale-up-center">
      <i class="modal-close-btn" @click="headerClose"></i>
      <div class="exchange-title">
        <img :src="logo" class="logo" />
      </div>
      <div class="exchange-area">
        <div class="exchange-form" :class="{'convert-input': isConvert}">
          <div class="exchange-form-item">
            <div class="exchange-form-info">
              <span>{{isConvert ? lang('输出') : lang('输入')}}</span>
              <span>ISPS</span>
            </div>
            <div class="exchange-form-input">
              <input class="form-input" type="number" @input="checkMax" v-model="isps" placeholder="0.00" />
            </div>
          </div>
          <div class="exchange-form-item">
            <div class="exchange-form-info">
              <span>{{!isConvert ? lang('输出') : lang('输入')}}</span>
              <span>USDT</span>
            </div>
            <div class="exchange-form-input">
              <input class="form-input" type="number" disabled v-model="usdt" placeholder="0.00" />
            </div>
          </div>
        </div>
        <div class="exchange-max-button" @click="setMax()">MAX</div>
        <!-- <div class="exchange-convert-button" @click="isConvert = !isConvert"></div> -->
      </div>
      <ul class="exchange-rate">
        <li>
          <span>ISPS</span>
          <span>{{userinfo.balanceBiw}}</span>
        </li>
        <li>
          <span>USDT</span>
          <span>{{userinfo.balanceUsdt}}</span>
        </li>
        <li>
          <span>{{lang('汇率')}}</span>
          <span>1ISPS={{ userinfo.exchangeRate }}USDT</span>
        </li>
        <li>
          <span>{{lang('手续费')}}</span>
          <span>{{ serviceCharge }} USDT</span>
        </li>
      </ul>
      <div class="exchange-footer">
        <f7-button class="exchange-btn" :disabled="!isps" preloader :loading="loading" @click="handleExchange()" large fill>{{lang('兑换')}}</f7-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from '../../../assets/images/logo.png'
import userPerson from "@/pinia/person";
import request from "@/tools/request";
import { f7 } from 'framework7-vue'
import fetchSign from '../../../pinia/fetchSign'
import { useI18n } from 'vue-i18n'
const { t:lang } = useI18n()
const person = userPerson();
const userinfo = $computed(() => person.userinfo);
let isps: any = $ref(null)
let loading = $ref(false)

const usdt = $computed(() => {
  if (isps) {
    return (Number(isps) * userinfo.biwPrice - Number(isps) * userinfo.biwPrice * userinfo.exchangeRate).toFixed(2)
  }

  return null
});

const serviceCharge = $computed(() => {
  if (isps) {
    return (Number(isps) * userinfo.biwPrice * userinfo.exchangeRate).toFixed(2)
  }

  return 0
})
// $watch(() => person.userinfo);

let isConvert = $ref(false)
const emits = defineEmits(['close'])

const checkMax = (e: any) => {
  const currentNum = Number(e.target.value)
  const maxNum = Number(userinfo.balanceBiw.replace(/[^0-9\.]/g, ''))

  if (currentNum > maxNum) {
    isps = maxNum
  }
}

const setMax = () => {
  if (Number(userinfo.balanceBiw.replace(/[^0-9\.]/g, '')) < 0.1) return
  isps = userinfo.balanceBiw.replace(/[^0-9\.]/g, '')
}

const headerClose = () => {
  emits('close')
}

const handleExchange = async () => {
  if (loading) return
  loading = true

  try {
    const sign = await fetchSign()
    const res: { code: number } = await request.post("app_server/exchange", {
      amount: String(isps),
      sign
    });

    loading = false

    if (res.code === 200) {
      emits('close')
      const toastCenter = f7.toast.create({
        text: lang('兑换成功'),
        position: 'center',
        closeTimeout: 2000,
      });

      toastCenter.open();
    }
  } catch (error: any) {
    if (error.action === 'signMessage') {
      const toastCenter = f7.toast.create({
        text: lang('签名失败'),
        position: 'center',
        closeTimeout: 2000,
      });

      toastCenter.open();
    }
    loading = false
  }
}

</script>
<style scoped lang="less">
@import "../styles/exchange.less";
</style>
