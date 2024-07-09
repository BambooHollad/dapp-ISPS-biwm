<template>
  <f7-page name="details">
    <ChildrenHeader />
    <div class="deal-details">
      <div class="details-info">
        <div class="details-info-logo">ISPS</div>
        <f7-toolbar class="details-info-tab" bottom tabbar>
          <f7-link tab-link="#tab-1" tab-link-active>{{lang('状态')}}</f7-link>
          <f7-link tab-link="#tab-2">{{lang('简介')}}</f7-link>
        </f7-toolbar>
        <f7-tabs animated>
          <f7-tab id="tab-1" class="page-content" tab-active>
            <f7-block>
              <ul class="details-info-list">
                <li>
                  <span>{{ lang('单T价格') }}</span>
                  <span>0.5 ISPS</span>
                </li>
                <li>
                  <span>{{lang('销售总量')}}</span>
                  <span>10331.25T</span>
                </li>
                <li>
                  <span>{{lang('已销售量')}}</span>
                  <span>110331.25T</span>
                </li>
                <li>
                  <span>{{lang('平均收益')}}/T</span>
                  <span>0.025 ISPS</span>
                </li>
                <li>
                  <span>{{ lang('已产出ISPS') }}</span>
                  <span>330.025 ISPS</span>
                </li>
                <li>
                  <span>{{lang('可购买量')}}</span>
                  <span>0T</span>
                </li>
                <li>
                  <span>{{ lang('已购买T') }}</span>
                  <span>0T</span>
                </li>
              </ul>
            </f7-block>
          </f7-tab>
          <f7-tab id="tab-2" class="page-content" tab-active>
            <f7-block>
              <ul class="details-info-list">
                <li>
                  <span>{{lang('名称')}}</span>
                  <span>nusk</span>
                </li>
                <li>
                  <span>{{lang('类型')}}</span>
                  <span>---</span>
                </li>
                <li>
                  <span>{{lang('节点查询')}}</span>
                  <span>F01924258</span>
                </li>
                <li>
                  <span>{{lang('发布时间')}}</span>
                  <span>2023-11-19 18:02:00</span>
                </li>
                <li>
                  <span>{{lang('挖矿周期')}}</span>
                  <span>180天</span>
                </li>
                <li>
                  <span>{{lang('挖矿开始时间')}}</span>
                  <span>2024-02-11</span>
                </li>
              </ul>
            </f7-block>
          </f7-tab>
        </f7-tabs>
      </div>
    </div>
  </f7-page>
</template>
<script setup lang="ts">
import lang from '@/i18n/index'
import ChildrenHeader from '../../components/header/childrenHeader.vue'
</script>
<style scoped lang="less">
@import "./styles/deal.less";
</style>
