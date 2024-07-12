<template>
  <div class="my">
    <div class="content-box">
      <div class="income-box">
        <div class="income-main">
          <p>{{lang('待领取收益')}}</p>
          <p>${{userinfo.locationCurrentSub || 0}}</p>
        </div>
        <div class="income-footer">
          <!-- <div class="income-footer-item">
            <p>0</p>
            <p>KEY</p>
          </div> -->
          <div class="income-footer-item">
            <p>0</p>
            <p>BIW</p>
          </div>
          <div class="income-footer-item">
            <p>0</p>
            <p>USDT</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="invite-box">
        <!-- <div class="income-box-item" @click="f7router.navigate('/link')">
          <span class="link">{{lang('邀请链接')}}</span>
          <i class="right-arrow-icon"></i>
        </div> -->
        <div class="income-box-item" @click="f7router.navigate('/count')">
          <span class="count">{{lang('邀请数量')}}</span>
          <i class="right-arrow-icon"></i>
        </div>
        <div class="income-box-item" @click="f7router.navigate('/withdrawal')">
          <span class="withdrawal">{{lang('提现')}}</span>
          <i class="right-arrow-icon"></i>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="asset-box">
        <div class="asset-header">
          <p>{{lang('总资产')}}</p>
          <p>${{ totalAsset }}</p>
        </div>
        <ul class="asset-tab-menu">
          <li :class="{'active-tab': tabMenu === 1}" @click="tabMenu = 1">{{lang('钱包资产')}}</li>
          <li :class="{'active-tab': tabMenu === 2}" @click="tabMenu = 2">{{lang('合约资产')}}</li>
        </ul>
        <div class="asset-item">
          <span>{{tabMenu === 1 ? lang('钱包资产') : lang('合约资产')}}</span>
          <span>${{formatNumber(tabMenu === 1 ? ispsUsdt : contractAsset)}}</span>
        </div>
        <div class="asset-list">
          <div class="asset-list-item">
            <div class="asset-list-item-left">
              <div class="asset-list-item-cover icon-isps"></div>
              <span>BIW</span>
            </div>
            <div class="asset-list-item-amount">
              <span>{{ formatNumber(tabMenu === 1 ? isps : userinfo.balanceBiw) }}</span>
              <!-- <span>1.19 USDT</span> -->
            </div>
          </div>
          <div class="asset-list-item">
            <div class="asset-list-item-left">
              <div class="asset-list-item-cover ustd-cover"></div>
              <span>USDT</span>
            </div>
            <div class="asset-list-item-amount">
              <span>{{ formatNumber(tabMenu === 1 ? usdt : userinfo.balanceUsdt) }}</span>
              <!-- <span>0 USDT</span> -->
            </div>
          </div>
          <div class="asset-list-item">
            <div class="asset-list-item-left">
              <div class="asset-list-item-cover icon-isps"></div>
              <span>UUKD</span>
            </div>
            <div class="asset-list-item-amount">
              <span>{{ formatNumber(tabMenu === 1 ? usdt : userinfo.balanceUsdt) }}</span>
              <!-- <span>0 USDT</span> -->
            </div>
          </div>
          <div class="asset-list-item">
            <div class="asset-list-item-left">
              <div class="asset-list-item-cover icon-isps"></div>
              <span>KKDT</span>
            </div>
            <div class="asset-list-item-amount">
              <span>{{ formatNumber(tabMenu === 1 ? usdt : userinfo.balanceUsdt) }}</span>
              <!-- <span>0 USDT</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { f7 } from 'framework7-vue'
import { ETH } from '@/tools/contract'
import userPerson from "@/pinia/person";
import lang from '@/i18n/index'
const view = f7.views.main
const person = userPerson();
const userinfo = $computed(() => person.userinfo);
const f7router = $ref(view.router)

const contractAsset = $computed(() => {
  return (Number(formatNumber(userinfo.balanceBiw)) * Number(userinfo.biwPrice) + Number(userinfo.balanceUsdt)).toFixed(2)
})

const totalAsset = $computed(() => {
  return (Number(ispsUsdt) + (Number(formatNumber(userinfo.balanceBiw)) * Number(userinfo.biwPrice) + Number(userinfo.balanceUsdt))).toFixed(2)
})


let tabMenu = $ref(1)
let usdt: string = $ref('0.0')
let isps: string = $ref('0.0')
let ispsUsdt = $ref('0.0')

const formatNumber = (number: number | string) => {
  // 将参数转换为数字类型
  const num = parseFloat(String(number));
  // 如果无法转换为有效数字，则返回原始参数
  if (isNaN(num)) {
      return number;
  }
  // 将数字保留两位小数
  return num.toFixed(2);
}

const getAccount = async () => {
  const usdtBalance = await ETH.getUSDTBalance()
  const ispsBalance = await ETH.getISPSBalance()
  const ispsCost = await ETH.getUsdtValueFromIsps(ispsBalance)
  // console.log('usdtBalance', usdtBalance, 'ispsBalance', ispsBalance, 'ispsCost', ispsCost)
  ispsUsdt = (Number(ispsCost) + Number(usdtBalance)).toFixed(4)
  usdt = String(usdtBalance)
  isps = String(ispsBalance)
}

getAccount()

const tabMenuChange = (index: number) => {
  tabMenu = index
}
</script>
<style scoped lang="less">
@import "../styles/my.less";
</style>
