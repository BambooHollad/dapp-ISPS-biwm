<template>
  <div class="home">
    <div class="banner">
      <img :src="banner" />
    </div>
    <div class="main">
      <RollingNew></RollingNew>
      <div class="show-content-banner">
        <div class="content-banner-item" style="align-items: flex-start">
          <div class="content-banner-name">{{lang('时间')}}</div>
          <div class="content-banner-data">{{dayjs(userinfo.time * 1000).format('MM月DD日')}}</div>
        </div>
        <div class="content-banner-item" style="align-items: center">
          <div class="content-banner-name">{{lang('代币')}}</div>
          <div class="content-banner-data">ISPS</div>
        </div>
        <div class="content-banner-item" style="align-items: flex-end">
          <div class="content-banner-name">{{lang('价格')}}</div>
          <div class="content-banner-data">${{userinfo.biwPrice}}</div>
        </div>
      </div>
      <div class="title">{{lang('全球前四名奖励')}}</div>
      <div class="content-box">
        <f7-toolbar class="tab-menu" bottom tabbar>
          <f7-link tab-link="#tab-1" tab-link-active>{{lang('日销售前四')}}{{userinfo.fourRewardPool}}U</f7-link>
          <f7-link tab-link="#tab-2">{{lang('日沉淀总数')}}{{userinfo.fourRewardPoolYes}}U</f7-link>
        </f7-toolbar>
        <f7-tabs animated>
          <f7-tab id="tab-1" class="tab-content" tab-active>
            <ul class="ranking-table">
              <li>{{lang('排名')}}</li>
              <li>{{lang('节点')}}</li>
              <li>{{lang('分享节点')}}</li>
              <li>{{lang('奖励')}}</li>
            </ul>
            <ul class="ranking-table" v-for="(item, index) in userinfo.four" :key="index">
              <li><i :class="`no-${index + 1}-icon`"></i></li>
              <li>{{formatAddress(item.location)}}</li>
              <li>{{item.amount}}</li>
              <li>{{item.reward}}</li>
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
              <div class="exchange-name">ISPS</div>
              <div class="exchange-price">{{ userinfo.balanceBiw }}</div>
            </div>
            <button class="exchange-button" @click="showExchange = true">{{lang('兑换 ISPS')}}</button>
          </div>
          <div class="exchange-data">
            <div class="exchange-data-item">
              <div class="exchange-data-name">{{lang('总分配')}}(ISPS)</div>
              <div class="exchange-data-value">{{ userinfo.configOne }}</div>
            </div>
            <div class="exchange-data-item">
              <div class="exchange-data-name">24H{{lang('产出')}}(ISPS)</div>
              <div class="exchange-data-value">{{ userinfo.configTwo }}</div>
            </div>
            <div class="exchange-data-item">
              <div class="exchange-data-name">{{lang('算力回报率')}}(APY)</div>
              <div class="exchange-data-value">{{ userinfo.configThree }}%</div>
            </div>
            <div class="exchange-data-item">
              <div class="exchange-data-name">{{lang('金库回报率')}}(APY)</div>
              <div class="exchange-data-value">{{ userinfo.configFour }}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="title">{{lang('锁仓分布图')}}</div>
      <div class="content-box" style="padding: 20px 10px;">
        <div class="chart">
          <div class="chart-main">

          </div>
          <ul class="chart-list">
            <li>
              {{lang('锁仓')}}: <span>4849943920</span>
            </li>
          </ul>
        </div>
        <div class="chart-address">
          {{lang('锁仓地址')}}<br>0x8b2e569d06413Bfae8d0c1709D2D1E0443B61576
        </div>
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
            <img src="../../../assets/images/link-3.png" alt="">
            <p>DSPA</p>
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

const person = userPerson();
const userinfo = $computed(() => person.userinfo);
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
