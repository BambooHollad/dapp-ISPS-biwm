<template>
  <div class="children-header">
    <div class="children-header-main">
      <div class="children-header-left">
        <i class="return-button" @click="f7router.back()">返回</i>
      </div>
      <div class="children-header-center">
        <i class="logo">
          <img :src="logo" />
        </i>
      </div>
      <div class="children-header-right">
        <i class="set-button" v-if="f7router.currentRoute.path !== '/profile'" @click="f7router.navigate('/profile')"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from '../../assets/images/logo.png'
import { f7 } from 'framework7-vue'
import path from 'path'
const view = f7.views.main
const f7router = $ref(view.router)

</script>
<style scoped lang="less">
@import "./childrenHeader.less";
</style>
