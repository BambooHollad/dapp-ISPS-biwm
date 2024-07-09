<template>
  <f7-page name="transfer">
    <ChildrenHeader />
    <div class="transfer">
      <div class="transfer-main">
        <div class="transfer-input-from">
          <div class="transfer-input-title">从</div>
          <div class="transfer-input-content">0xC84b249B43BA1887702D5499b6cb6594EC0b19DC</div>
        </div>
        <div class="transfer-input-to">
          <div class="transfer-input-title">到</div>
          <div class="transfer-input-content">
            <f7-input label="Textarea" type="textarea" placeholder="0x f0 f1 f2 f3 f4"></f7-input>
          </div>
        </div>
        <div class="transfer-input-amount">
          <div class="transfer-input-title">
            <span>金额</span>
            <span>余额:0.1999FIL</span>
          </div>
          <div class="transfer-input-content">
            <f7-input label="Textarea" type="text" placeholder="0.00"></f7-input>
          </div>
          <div class="transfer-dollar">≈$0.00</div>
        </div>
      </div>
      <div class="transfer-footer">
        <f7-button class="send-button" fill disabled>发送</f7-button>
        <f7-button class="reset-button">重置</f7-button>
      </div>
    </div>
  </f7-page>
</template>
<script setup lang="ts">
import ChildrenHeader from '../../components/header/childrenHeader.vue'

</script>
<style scoped lang="less">
@import "./styles/transfer.less";
</style>
