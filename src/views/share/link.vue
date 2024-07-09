<template>
  <f7-page name="link">
    <ChildrenHeader />
    <div class="share-main" v-if="userinfo.LocationList.length !== 0">
      <div class="share-logo"><img :src="logo" /></div>
      <div class="content-box">
        <div class="share-link">
          <p>{{lang('扫一扫')}}</p>
          <p style="color: #25eeb1">{{lang('邀请好友一起赚币吧')}}!</p>
          <div class="qrcode">
            <img :src="qrCodeUrl" />
          </div>
          <p>{{ inviteUrl }}</p>
          <div class="share-btn" @click="copyToClipboard(inviteUrl)">{{lang('复制链接')}}</div>
        </div>
      </div>
    </div>
    <div class="inactive-content" v-else>{{lang('未激活暂时无法邀请用户')}}</div>
  </f7-page>
</template>
<script setup lang="ts">
import QRCode from 'qrcode'
import logo from '../../assets/images/logo.png'
import ChildrenHeader from '../../components/header/childrenHeader.vue'
import userPerson from "@/pinia/person";
import lang from '@/i18n/index'
import copy from 'copy-to-clipboard';
import { f7 } from 'framework7-vue'
const person = userPerson();
const userinfo = $computed(() => person.userinfo);

let qrCodeUrl = $ref('');

const linkList: any = {
  test: `http://${window.location.host}/test_go/www/#/?inviteCode=-inviteTdh-${userinfo.inviteUrl}-inviteTdh-`,
  prod: `https://${window.location.host}/#/?inviteCode=-inviteTdh-${userinfo.inviteUrl}-inviteTdh-`
}

const inviteUrl = $computed(() => userinfo.inviteUrl && userinfo.LocationList.length !== 0 ? linkList[import.meta.env.MODE] : ``,)

const generateQRCode = () => {
  if (userinfo.LocationList.length === 0) return
  QRCode.toDataURL(inviteUrl, (err: any, url: any) => {
    if (err) {
      console.error(err);
      return;
    }
    qrCodeUrl = url;
  });
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

generateQRCode()
</script>
<style scoped lang="less">
@import "./styles/index.less";
</style>
