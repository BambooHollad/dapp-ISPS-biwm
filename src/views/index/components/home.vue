<template>
  <div class="home">
    <div class="banner">
      <img :src="banner" />
    </div>
    <div class="main">
      <!-- <RollingNew></RollingNew> -->
      <div class="title">{{lang('全球节点')}}</div>
      <div class="content-box">
        <f7-toolbar class="tab-menu" bottom tabbar>
          <f7-link tab-link="#tab-1" tab-link-active>{{lang('今日认购初级节点')}}</f7-link>
          <f7-link tab-link="#tab-2">{{lang('今日认购超级节点')}}</f7-link>
        </f7-toolbar>
        <f7-tabs animated>
          <f7-tab id="tab-1" class="tab-content" tab-active>
            <!-- <ul class="ranking-table">
              <li>{{lang('排名')}}</li>
              <li style="flex: 1;">{{lang('节点')}}</li>
              <li>{{lang('分享节点')}}</li>
              <li>{{lang('奖励')}}</li>
            </ul> -->
            <ul class="ranking-table" v-for="(item, index) in userinfo.first" :key="index">
              <!-- <li><i :class="`no-${index + 1}-icon`"></i></li> -->
              <li style="flex: 1;">{{item.address}}</li>
              <!-- <li>{{item.amount}}</li>
              <li>{{item.reward}}</li> -->
            </ul>
          </f7-tab>
          <f7-tab id="tab-2" class="tab-content" tab-active>
            <!-- <ul class="ranking-table">
              <li>{{lang('排名')}}</li>
              <li style="flex: 1;">{{lang('节点')}}</li>
              <li>{{lang('分享节点')}}</li>
              <li>{{lang('奖励')}}</li>
            </ul> -->
            <ul class="ranking-table" v-for="(item, index) in userinfo.Second" :key="index">
              <!-- <li><i :class="`no-${index + 1}-icon`"></i></li> -->
              <li style="flex: 1;">{{item.address}}</li>
              <!-- <li>{{item.amount}}</li>
              <li>{{item.reward}}</li> -->
            </ul>
          </f7-tab>
        </f7-tabs>
        <div class="update-date">{{lang('倒计时')}}:{{countDown}}</div>
      </div>
      <div class="title">{{lang('兑换')}}</div>
      <div class="content-box">
        <div class="exchange-main">
          <div class="exchange-box">
            <i class="exchange-icon icon-isps"></i>
            <div class="exchange-info">
              <div class="exchange-name">BIW</div>
              <div class="exchange-price">{{ userinfo.biwBalance }}</div>
            </div>
            <button class="exchange-button" disabled @click="showExchange = true">{{lang('暂未开放')}}</button>
          </div>
          <div class="exchange-data">
            <div class="exchange-data-item">
              <div class="exchange-data-name">{{lang('总分配')}}(BIW)</div>
              <div class="exchange-data-value">21亿</div>
            </div>
            <div class="exchange-data-item">
              <div class="exchange-data-name">24H{{lang('产出')}}(BIW)</div>
              <div class="exchange-data-value">22830</div>
            </div>
            <div class="exchange-data-item">
              <div class="exchange-data-name">{{lang('算力回报率')}}</div>
              <div class="exchange-data-value">{{ userinfo.configThree }}%</div>
            </div>
            <div class="exchange-data-item">
              <div class="exchange-data-name">{{lang('每日沉淀池')}}(BIW)</div>
              <div class="exchange-data-value">{{ userinfo.configFour }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="title">{{lang('BIW发行量')}}</div>
      <div class="content-box" style="padding: 20px 10px;">
        <div class="chart">
          <div class="chart-main">

          </div>
          <ul class="chart-list">
            <li>
              {{lang('发行量')}}: <span>21亿</span>
            </li>
          </ul>
        </div>
        <!-- <div class="chart-address">
          {{lang('锁仓地址')}}<br>0x8b2e569d06413Bfae8d0c1709D2D1E0443B61576
        </div> -->
      </div>
      <div class="title">{{lang('合作伙伴')}}</div>
      <div class="content-box" style="padding: 20px 10px;">
        <div class="link-box">
          <div class="link-item">
            <img src="../../../assets/images/link-1.png" alt="">
            <p>Binance</p>
          </div>
          <div class="link-item">
            <img src="../../../assets/images/link-2.png" alt="">
            <p>Protocol Labs</p>
          </div>
          <div class="link-item">
            <img src="../../../assets/images/biw-logo.jpg" style="border-radius: 50%" alt="">
            <p>BIW</p>
          </div>
          <div class="link-item">
            <img src="../../../assets/images/link-4.png" alt="">
            <p>FoxWallet</p>
          </div>
        </div>
      </div>
    </div>
    <Exchange v-if="showExchange" @close="showExchange = false"></Exchange>
  </div>
</template>
<script setup lang="ts">
import banner from '../../../assets/images/banner.png'
import Exchange from './exchange.vue'
import userPerson from "@/pinia/person";
import dayjs from 'dayjs'
import lang from '@/i18n/index'
import RollingNew from './rollingNew.vue';
import { defineProps, defineEmits } from 'vue'
// import BiwMeta from '@/services/index'

const person = userPerson();
const userinfo = $computed(() => person.userinfo);

// const biwMeta = new BiwMeta();

// let biwBalance: any = $ref('0.00')

// const initBiwBalance = async () => {
//   const balance = await biwMeta.getBalance()

//   biwBalance = balance
// }

// initBiwBalance()

let showExchange = $ref(false)

const props = defineProps({
  handleMenuChange: Function
})

const countDown = $computed(() => {
  return getCountDown(userinfo.time)
});

const formatAddress = (value: string) => {
  const frontSix = value.slice(0, 6);
  const backSix = value.slice(-4);
  const middle = '...';
  return frontSix + middle + backSix;
}

const getCountDown = (time: number) => {
  const now = dayjs(time * 1000);
  // 获取今天结束的时间点
  const todayEnd = now.endOf('day').add(1, 'second');
  // 计算剩余的时间
  const duration = todayEnd.diff(now); // 返回毫秒数
  // 将剩余时间转换成小时和分钟
  const hours = parseInt(`${duration / 3600000}`); // 毫秒数转换成小时
  const minutes = parseInt(`${(duration - Math.floor(hours) * 3600000) / 60000}`); // 剩余毫秒数转换成分钟

  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
}

</script>
<style scoped lang="less">
@import "../styles/home.less";
</style>
