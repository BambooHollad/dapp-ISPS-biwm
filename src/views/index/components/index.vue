<template>
<div class='main'>
  <img :src="indexPic1" />
  <img :src="indexPic2" />
  <img :src="indexPic3" />
</div>
</template>
<script setup>
import indexPic1 from '@/assets/images/index-1.jpg'
import indexPic2 from '@/assets/images/index-2.jpg'
import indexPic3 from '@/assets/images/index-3.jpg'

</script>
<style lang='less' scoped>
.main {
  display: flex;
  flex-direction: column;
  img {
    display: block;
    width: 100%;
    margin-top: -1px;
  }
}
</style>