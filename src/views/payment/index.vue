<template>
  <f7-page name="payment">
    <ChildrenHeader />
    <div class="payment">
      <div class="payment-card">
        <div class="payment-card-head">
          <div class="payment-card-title">钱包1</div>
          <f7-button class="transfer-button" fill @click="f7router.navigate('/transfer')">钱包转账</f7-button>
        </div>
        <div class="payment-user">
          <div class="payment-user-avatar"></div>
          <div class="payment-user-sn">
            <p>0xc84b24...ec0b19dc<span>复制</span></p>
            <p>f410fzbf...4njdiywi<span>复制</span></p>
          </div>
        </div>
        <div class="payment-user">
          <div class="payment-user-avatar"></div>
          <div class="payment-user-sn">
            <p>DIW<span>$1.2231 USD</span></p>
            <p>0.1999 DIW</p>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<script setup lang="ts">
import ChildrenHeader from '../../components/header/childrenHeader.vue'
import { f7 } from 'framework7-vue'
const view = f7.views.main
const f7router = $ref(view.router)

</script>
<style scoped lang="less">
@import "./styles/index.less";
</style>
