<template>
  <f7-page name="link">
    <ChildrenHeader />
    <div class="withdrawal-main">
      <div class="content-box">
        <div class="content-box-title">{{lang('提现金额')}}<span>BIW</span></div>
        <div class="content-box-content">
          <input class="form-input" v-model="amount" @input="checkMax" type="number" :placeholder="lang('请输入金额')" />
          <div class="form-sidebar">
          <f7-button class="all-amount-btn" outline round @click="handleAllAmount()">{{lang('全部')}}</f7-button>
            <div class="form-balance">{{lang('余额')}}: {{ userinfo.balanceBiw }}</div>
          </div>
        </div>
      </div>
      <f7-button class="withdrawal-btn" :disabled="!amount" preloader :loading="loading" @click="handleWithdrawal()" large fill>{{lang('提现')}}</f7-button>
    </div>
  </f7-page>
</template>
<script setup lang="ts">
import ChildrenHeader from '../../components/header/childrenHeader.vue'
import userPerson from "@/pinia/person";
import request from "@/tools/request";
import lang from '@/i18n/index'
import { f7 } from 'framework7-vue'
import BiwMeta from '@/services/index'
import { $WALLET_AUTHORIZE_ADDRESS_TYPE, $WALLET_PLAOC_PATH, $WALLET_SIGNATURE_TYPE, CHAIN_NAME, type $WEALLET_ADDRESS_RESPONSE } from '@/services/biwmeta/types';
const person = userPerson();
const userinfo = $computed(() => person.userinfo);

let amount: any = $ref('')
let loading = $ref(false)

const handleAllAmount = () => {
  if (Number(userinfo.balanceUsdt) < 0.1) return false
  amount = userinfo.balanceUsdt
}

const checkMax = (e: any) => {
  const currentNum = Number(e.target.value)
  const maxNum = Number(userinfo.balanceUsdt)
  // const maxNum = Number(100)

  if (currentNum > maxNum) {
    amount = maxNum
  }
}

const handleWithdrawal = async() => {
  if (loading) return
  loading = true

  const biwMeta = new BiwMeta()
  const signList = await biwMeta.sign() as any
  const biwSign: $WEALLET_ADDRESS_RESPONSE = signList.find((item: any) => item.name === 'BIW') as $WEALLET_ADDRESS_RESPONSE

  try {

    const res: { code: number } = await request.post("app_server/withdraw", {
      amount: String(amount),
      sign: biwSign?.signMessage,
      publicKey: biwSign.publicKey
    });

    loading = false

    if (res.code === 200) {
      amount = ''
      const toastCenter = f7.toast.create({
        text: lang("提现成功"),
        position: 'center',
        closeTimeout: 2000,
      });

      toastCenter.open();
    }
  } catch (error: any) {
    if (error.action === 'signMessage') {
      const toastCenter = f7.toast.create({
        text: lang("签名失败"),
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
@import "./styles/index.less";
</style>
