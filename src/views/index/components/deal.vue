<template>
  <div class="deal">
    <ul class="deal-menu">
      <li @click="tabMenu = 1" :class="{'selected-menu': tabMenu === 1}">IDO</li>
      <li @click="tabMenu = 2" :class="{'selected-menu': tabMenu === 2}">{{lang('认购记录')}}</li>
      <li @click="tabMenu = 3" :class="{'selected-menu': tabMenu === 3}">{{lang('挖矿收益')}}</li>
      <!-- <li @click="tabMenu = 4" :class="{'selected-menu': tabMenu === 4}">{{lang('提现')}}</li> -->
    </ul>
    <div class="deal-list" v-show="tabMenu === 1">
      <div class="content-box" v-for="(item, index) in idoList" :key="index">
        <div class="commodity-box">
          <div class="commodity-column">
            <p>{{lang('节点')}}</p>
            <p class="commodity-providers"><i class="commodity-avatar"></i>USDT</p>
          </div>
          <div class="commodity-column">
            <p>{{lang('可购买量')}}</p>
            <p class="commodity-quantity">
              <span>{{lang('剩余')}} {{item.percentage.toFixed(2)}}%</span>
              <span class="commodity-quantity-line">
                <i class="commodity-quantity-progress" :style="`width: ${item.percentage}%`"></i>
              </span>
            </p>
          </div>
          <div class="commodity-column">
            <p>{{lang('数量')}}</p>
            <p>{{ item.count }}</p>
          </div>
          <div class="commodity-column">
            <p class="shop-box">
              <f7-button class="shop-btn" @click="transferUsdt(item.type, false)" :loading="loading" fill>{{lang('单币购买')}}</f7-button>
              <!-- <f7-button class="shop-btn" :disabled="userinfo.status !== 'stop'" @click="(usdtApproved && ispsApproved) ? transferUsdt(item.type, true) : mergeApprove()" :loading="loading" fill>{{lang('双币购买')}}</f7-button> -->
              <!-- <div class="shop-btn" @click="usdtApproved ? transferUsdt(index, false) : usdtApprove()" :class="{'loading': loading}">{{lang('购买')}}</div>
              <div class="shop-btn" @click="(usdtApproved && ispsApproved) ? transferUsdt(index, true) : mergeApprove()" :class="{'loading': loading}">{{lang('联合购买')}}</div> -->
            </p>
          </div>

        </div>
      </div>
    </div>
    <div class="deal-list" v-show="tabMenu === 2">
      <div class="content-box" v-for="(item, index) in userinfo.LocationList" :key="index">
        <div class="order-box">
          <div class="order-column">
            <p>{{lang('节点')}}</p>
            <p>{{ item.amount }}</p>
          </div>
          <div class="order-column">
            <p>{{lang('挖矿')}}</p>
            <p>{{ item.currentMaxSubCurrent }}</p>
          </div>
          <div class="order-column">
            <p>{{lang('收益')}}</p>
            <p>{{ item.current }}</p>
          </div>
          <div class="order-column">
            <p>{{lang('出局')}}</p>
            <p>{{ userinfo.count }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="deal-list" v-show="tabMenu === 3">
      <div class="content-box" v-if=" userinfo.listReward.length > 0">
        <div class="income-list">
          <div class="income-item" v-for="(item, index) in userinfo.listReward" :key="index">
            <div class="income-item-info">
              <p>{{ incomeType[item.type] }}</p>
              <p>{{ item.createdAt }}</p>
            </div>
            <div class="income-item-money">{{ item.reward }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="deal-list" v-show="tabMenu === 4">
      <div class="content-box" v-if=" userinfo.withdrawList.length > 0">
        <div class="income-list">
          <div class="income-item" v-for="(item, index) in userinfo.withdrawList" :key="index">
            <div class="income-item-info">
              <p>{{ item.createdAt }}</p>
            </div>
            <div class="income-item-money">{{ item.amount }}</div>
          </div>
        </div>
      </div>
    </div>
    <Exchange v-if="isPopupOpened" @close="changePopup(false)" />
  </div>
</template>

<script setup lang="ts">
import Exchange from './exchange.vue'
import userPerson from "@/pinia/person";
import userSystem from "@/pinia/system";
import { Contract, ETH } from "@/tools/contract";
import lang from '@/i18n/index'
import { showDialog } from "vant";
import { $WALLET_AUTHORIZE_ADDRESS_TYPE, $WALLET_PLAOC_PATH, $WALLET_SIGNATURE_TYPE, CHAIN_NAME, type $WEALLET_ADDRESS_RESPONSE } from '@/services/biwmeta/types';
import web3 from 'web3';
const USDT: Contract = new Contract(import.meta.env.VITE_USDT, "ERC20");
const BUY: Contract = new Contract(import.meta.env.VITE_BUY, "BUY");

let loading = $ref(true);
const system = userSystem();
const person = userPerson();
const userinfo = $computed(() => person.userinfo);
const biwSign = $computed(() => person.biwSign);
const signList = $computed(() => person.signList);

let bugNumList = ['300', '1000', '3000', '5000', '10000', '100']
const incomeType: { [key: string]: string } = {
  '1': lang('挖矿收益'),
  '2': lang('节点收益'),
  '3': lang('超级节点收益'),
  '4': lang('矩阵收益'),
  '5': lang('兑换'),
  '6': lang('提现'),
  '7': lang('认购')
}

// let usdtApproved = $ref(false);
// const getNewApproved = async () => {
//   const res = await BUY2.call("allowance", [ETH.account, BUY.address])

//   console.log(res)
// }
/* 获取授权 */
// const getUsdtApproved = async () => {
//   console.log(signList)
//     const bsc: $WEALLET_ADDRESS_RESPONSE = signList.find((item: any) => item.name === 'BSC') || {}

//     if (bsc) {
//       let res = await USDT.call(bsc.address as string);
//       console.log(res)
//       // usdtApproved = Number(res) > 0;
//     }
//     return usdtApproved
// }

// const usdtApprove = () => {
//   const bsc: $WEALLET_ADDRESS_RESPONSE = signList.find((item: any) => item.name === 'BSC') || {}

//   USDT.send("approve", bsc, [
//       BUY.address,
//       "115792089237316195423570985008687907853269984665640564039457584007913129639935"
//   ]).then(getUsdtApproved).catch(() => loading = false);
// }

// getUsdtApproved()
// getIspsApproved()

/* USDT转账 */
const transferUsdt = async (type: number, state: boolean) => {
  const bsc = signList.find((item: any) => item.name === 'BSC')

  if (bsc) {
    loading = true;
    person.userinfo.status = 'running'
    console.log('BUY', BUY)
    const amount = web3.utils.toWei('1', 'ether');
    BUY.send("buyBak", bsc, [1000, import.meta.env.VITE_BUY]).then(() => {
        loading = false;
        system.setBuyTime();
        showDialog({
          title: lang('提示'),
          message: lang(`USDT 转账成功！`),
          theme: 'round-button',
          confirmButtonColor: "#242738",
          confirmButtonText: lang('我知道了！'),
        })
    }).catch(() => loading = false);
  }
}

// const transferUsdt = async (type: number, state: boolean) => {
//   const bsc = signList.find((item: any) => item.name === 'BSC')

//   console.log(111, bsc)

//   if (bsc) {
//     loading = true;
//     person.userinfo.status = 'running'
//     console.log('BUY', BUY)
//     const amount = web3.utils.toWei('1', 'ether');
//     USDT.send("transfer", bsc, [import.meta.env.VITE_USDT, amount]).then(() => {
//         loading = false;
//         system.setBuyTime();
//         showDialog({
//           title: lang('提示'),
//           message: lang(`USDT 转账成功！`),
//           theme: 'round-button',
//           confirmButtonColor: "#242738",
//           confirmButtonText: lang('我知道了！'),
//         })
//     }).catch(() => loading = false);
//   }
// }

let idoList = [
  {
    count: 1000,
    type: 6,
    buyNum: userinfo.buyNumSix,
    sellNum: userinfo.sellNumSix,
    percentage: userinfo.buyNumSix / (userinfo.buyNumSix + userinfo.sellNumSix) * 100
  },
  {
    count: 3000,
    type: 1,
    buyNum: userinfo.buyNumOne,
    sellNum: userinfo.sellNumOne,
    percentage: userinfo.buyNumOne / (userinfo.buyNumOne + userinfo.sellNumOne) * 100
  },
  {
    count: 5000,
    type: 2,
    buyNum: userinfo.buyNumTwo,
    sellNum: userinfo.sellNumTwo,
    percentage: userinfo.buyNumTwo / (userinfo.buyNumTwo + userinfo.sellNumTwo) * 100
  },
  {
    count: 15000,
    type: 3,
    buyNum: userinfo.buyNumThree,
    sellNum: userinfo.sellNumThree,
    percentage: userinfo.buyNumThree / (userinfo.buyNumThree + userinfo.sellNumThree) * 100
  },
  {
    count: 30000,
    type: 4,
    buyNum: userinfo.buyNumFour,
    sellNum: userinfo.sellNumFour,
    percentage: userinfo.buyNumFour / (userinfo.buyNumFour + userinfo.sellNumFour) * 100
  }
]

let tabMenu = $ref(1)
let isPopupOpened = $ref(false)

// Get the router instance

// Expose router to be used in the template
// const $router = route.router

const changePopup = (value: boolean) => {
  isPopupOpened = value
}
</script>
<style scoped lang="less">
@import "../styles/deal.less";
</style>
