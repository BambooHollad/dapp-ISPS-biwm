<template>
  <f7-page name="index">
    <div class="header">
      <div class="header-main">
        <div class="header-left">
          <i class="menu-button" @click="isOpened = true"></i>
        </div>
        <div class="header-center">
          <i class="logo">
            <img :src="logo" />
          </i>
        </div>
        <div class="header-right">
          <i class="set-button" @click="f7router.navigate('/profile')"></i>
        </div>
      </div>
    </div>
    <Home :handleMenuChange="handleMenuChange" v-show="menu === 1" />
    <Deal v-if="menu === 2" />
    <Wallet v-if="menu === 3" />
    <My v-if="menu === 4" />
    <Staking v-if="menu === 5" />
    <Footer @menuChange="handleMenuChange" />
    <f7-panel side="left" backdrop-el="#sidebar-panel" class="sidebar" v-model:opened="isOpened">
      <div id="sidebar-panel" @click="isOpened = false"></div>
      <div class="sidebar-logo">
        <img :src="logo" class="logo" />
      </div>
      <div class="sidebar-menu">
        <div class="sidebar-menu-item index-icon" @click="openRouter(1)">{{lang('官网')}}</div>
        <div class="sidebar-menu-item browser-icon" @click="openRouter(5)">{{lang('白皮书')}}</div>
        <div class="sidebar-menu-item browser-icon">{{lang('视频')}}</div>
        <div class="sidebar-menu-item browser-icon">{{lang('项目计划书')}}</div>
        <div class="sidebar-menu-item news-icon">{{lang('新闻公告')}}</div>
        <!-- <div class="sidebar-menu-item deal-icon" @click="openPayment">钱包转账</div> -->
      </div>
      <div class="sidebar-menu">
        <a href="#" class="sidebar-menu-item twitter-icon">Twitter</a>
        <a href="#" class="sidebar-menu-item telegram-icon">Telegram</a>
        <a href="#" class="sidebar-menu-item medium-icon">Medium</a>
        <a href="#" class="sidebar-menu-item email-icon">Email</a>
      </div>
    </f7-panel>
  </f7-page>
</template>
<script setup lang="ts">
import logo from '../../assets/images/logo.png'
import Home from './components/home.vue'
import Deal from './components/deal.vue'
import Wallet from './components/wallet.vue'
import Staking from './components/staking.vue'
import My from './components/my.vue'
import Footer from '../../components/footer/index.vue'
import lang from '@/i18n/index'
import { f7 } from 'framework7-vue'
const view = f7.views.main
const f7router = $ref(view.router)
// @click="f7router.navigate('/idoDetails');"

let menu = $ref(1)
let isOpened = $ref(false)

const handleMenuChange = (index: number) => {
  menu = index
}

const openPayment = () => {
  isOpened = false
  f7router.navigate('payment')
}

const openRouter = (index: number) => {
  isOpened = false
  menu = index
}

</script>
<style scoped lang="less">
@import "index";
</style>
