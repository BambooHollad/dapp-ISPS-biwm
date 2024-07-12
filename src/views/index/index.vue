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
    <Index v-if="menu === 6" />
    <Footer @menuChange="handleMenuChange" />
    <f7-panel side="left" backdrop-el="#sidebar-panel" class="sidebar" v-model:opened="isOpened">
      <div id="sidebar-panel" @click="isOpened = false"></div>
      <div class="sidebar-logo">
        <img :src="logo" class="logo" />
        <div class="address-text">{{userinfo.inviteUrl}}<button class="copy-address-button" @click="copyToClipboard(userinfo.inviteUrl)">复制</button></div>
      </div>
      <div class="sidebar-menu">
        <a href="javascript:void(0);" @click="openRouter(6)" class="sidebar-menu-item index-icon">{{lang('首页')}}</a>
        <a href="javascript:void(0);" @click="openUrl('https://www.biw-meta.com')" class="sidebar-menu-item browser-icon">{{lang('官网')}}</a>
        <a href="javascript:void(0);" @click="openUrl('http://www.biw-meta.info')" class="sidebar-menu-item browser-icon">浏览器</a>
        <a href="javascript:void(0);" @click="openUrl('https://sj.qq.com/appdetail/info.bagen.dwebbrowser')" class="sidebar-menu-item browser-icon">钱包下载</a>
        <div class="sidebar-menu-item browser-icon" @click="openRouter(5)">{{lang('白皮书')}}</div>
        <!-- <div class="sidebar-menu-item browser-icon">{{lang('视频')}}</div>
        <div class="sidebar-menu-item browser-icon">{{lang('项目计划书')}}</div>
        <div class="sidebar-menu-item news-icon">{{lang('新闻公告')}}</div> -->
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
import Index from './components/index.vue'
import My from './components/my.vue'
import Footer from '../../components/footer/index.vue'
import userPerson from "@/pinia/person";
import lang from '@/i18n/index'
import { f7 } from 'framework7-vue'
import copy from 'copy-to-clipboard';
const view = f7.views.main
const f7router = $ref(view.router)
// @click="f7router.navigate('/idoDetails');"

let menu = $ref(1)
let isOpened = $ref(false)
const person = userPerson();
const userinfo = $computed(() => person.userinfo);

const openUrl = (url: string) => {
  window.location.href = url
}

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

const formatAddress = (value: string) => {
  const frontSix = value.slice(0, 6);
  const backSix = value.slice(-4);
  const middle = '...';
  return frontSix + middle + backSix;
}

const copyToClipboard = (text: string) => {
  copy(text);

  const toastCenter = f7.toast.create({
    text: lang("内容已复制到剪贴板"),
    position: 'center',
    closeTimeout: 2000,
  });
    // Open it
  toastCenter.open();
}
</script>
<style scoped lang="less">
@import "index";
</style>
