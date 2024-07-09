<template>
  <f7-page name="profile">
    <ChildrenHeader />
    <ul class="profile">
      <li>
        <span>{{lang('语言切换')}}</span>
        <span>中文|English<f7-toggle color="orange" :checked="checked" :onChange="onChangeLanguage" style="margin-left: 10px;"></f7-toggle></span>
      </li>
    </ul>
  </f7-page>
</template>
<script setup lang="ts">
import ChildrenHeader from '../../components/header/childrenHeader.vue'
import { f7 } from 'framework7-vue'
import lang from '@/i18n/index'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

let toast: any = $ref(null)

let checked = $ref(localStorage.getItem('lan') === 'en' ? true : false)

const onChangeLanguage = (value: any) => {
  if (value.target.checked) {
    localStorage.setItem('lan', 'en')
    location.reload()
    // locale.value = 'zh'
  } else {
    localStorage.setItem('lan', 'zh')
    location.reload()
    // locale.value = 'en'
  }
}

</script>
<style scoped lang="less">
@import "./styles/index.less";
</style>
