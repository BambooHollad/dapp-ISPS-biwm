<template>
  <f7-page name="count">
    <ChildrenHeader />
    <div class="share-main">
      <f7-toolbar class="tab-menu" bottom tabbar>
        <f7-link tab-link="#tab-a" tab-link-active>{{lang('我的节点')}}</f7-link>
        <f7-link tab-link="#tab-b">{{lang('我的收益')}}</f7-link>
        <f7-link tab-link="#tab-c">{{lang('网络图')}}</f7-link>
      </f7-toolbar>
      <f7-tabs animated>
        <f7-tab id="tab-a" class="tab-content" tab-active>
          <div class="node-head">
            <div class="node-head-item">
              <p>{{lang('级别')}}</p>
              <p>{{ levelType[userinfo.lastLevel] }}</p>
            </div>
            <div class="node-head-item">
              <p>{{lang('分享节点')}}</p>
              <p>{{ userinfo.recommendTotal }}</p>
            </div>
            <!-- <div class="node-head-item">
              <p>{{lang('总业绩')}}</p>
              <p>{{userinfo.areaAll}}</p>
            </div> -->
            <!-- <div class="node-head-item">
              <p>{{lang('大区业绩')}}</p>
              <p>{{userinfo.areaMax}}</p>
            </div>
            <div class="node-head-item">
              <p>{{lang('小区业绩')}}</p>
              <p>{{userinfo.areaMin}}</p>
            </div> -->
            <div class="node-head-item">
              <p>{{lang('推荐人')}}</p>
              <p style="font-size: 13px">{{ formatAddress(userinfo.inviteUserAddress) }}</p>
            </div>
          </div>
          <div class="node-list">
            <div class="null-content" v-if="userinfo.listRecommend.length === 0">{{lang('暂无数据')}}</div>
            <ul v-else>
              <li v-for="(item, index) in userinfo.listRecommend" :key="index">{{ item.address }}</li>
            </ul>
          </div>
        </f7-tab>
        <f7-tab id="tab-b" class="tab-content">
          <div class="content-box">
            <div class="income-box">
              <div class="income-main">
                <p>{{lang('待领取收益')}}</p>
                <p>${{userinfo.locationCurrentSub || 0}}</p>
              </div>
              <div class="income-footer">
                <div class="income-footer-item">
                  <p>{{lang('节点')}}</p>
                  <p>{{userinfo.locationUsdt || 0}}</p>
                </div>
                <!-- <div class="income-footer-item">
                  <p>{{lang('待产出')}}</p>
                  <p>{{userinfo.locationCurrentMaxSub || 0}}</p>
                </div>
                <div class="income-footer-item">
                  <p>{{lang('已产量')}}</p>
                  <p>{{userinfo.locationCurrentSub || 0}}</p>
                </div> -->
                <!-- <div class="income-footer-item">
                  <p>{{lang('出局次数')}}</p>
                  <p>{{userinfo.count || 0}}</p>
                </div> -->
                <div class="income-footer-item">
                  <p>{{lang('挖矿收益')}}</p>
                  <p>{{userinfo.rewardFirst}}</p>
                </div>
                <!-- <div class="income-footer-item">
                  <p>{{lang('分享收益')}}</p>
                  <p>{{userinfo.recommendReward}}</p>
                </div> -->
                <div class="income-footer-item">
                  <p>{{lang('节点收益')}}</p>
                  <p>{{userinfo.rewardSecond}}</p>
                </div>
                <div class="income-footer-item">
                  <p>{{lang('超级节点收益')}}</p>
                  <p>{{userinfo.rewardThird}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="income-list">
            <input
              className="list-menu-select"
              id="demo-picker-device"
              type="text"
              placeholder="Your iOS device"
              :readonly="false"
            />
            <!-- <div class="income-list-header">
              <ul class="header-list">
                <li :class="{'activeTab': activeTab === 0}" @click="activeTab = 0">{{lang('全部')}}</li>
                <li v-for="(item, index) in Object.values(menuType)" :class="{'activeTab': activeTab === (index + 1)}" @click="activeTab = (index + 1)" :key="index">{{ item }}</li>
              </ul>
            </div> -->
            <!-- v-if="!item.type ? true : item.type === activeTab" -->
            <div class="income-list-main">
              <div class="income-list-item" v-for="(item, index) in userinfo.listReward" :key="index" v-show="item.type === activeTab || activeTab === '0'">
                <div class="income-list-item-info">
                  <p>{{ menuType.find(value => value[0] === item.type) && menuType.find(value => value[0] === item.type)[1] }}</p>
                  <p>{{ item.createdAt }}</p>
                </div>
                <div class="income-list-item-money">{{ item.reward }}</div>
              </div>
              <!-- <div class="income-list-item" v-for="(item, index) in userinfo.listReward" :style="`display: ${!activeTab ? 'flex' : Number(item.type) === activeTab ? 'flex' : 'none'}`" :key="index">
                <div class="income-list-item-info">
                  <p>{{ incomeType[item.type] }}</p>
                  <p>{{ item.createdAt }}</p>
                </div>
                <div class="income-list-item-money">{{ item.reward }}</div>
              </div> -->
            </div>
          </div>
        </f7-tab>
        <f7-tab id="tab-c" class="tab-content">
          <!-- <div class="node-list">
            <div class="null-content">暂无数据</div>
          </div> -->
          <!-- <TreeVue
            :items="items"
            :isCheckable="false"
            :hideGuideLines="false"
            :lazyLoad="true"
            @onExpand="onItemExpanded"
          >
          </TreeVue> -->
          <a-tree
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            :load-data="onLoadData"
            :tree-data="treeData"
          />
          <!-- <f7-treeview class="treeview">
            <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')">
              <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')">
                <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')" />
                <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')" />
              </f7-treeview-item>
              <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')">
                <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')" />
                <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')" />
              </f7-treeview-item>
            </f7-treeview-item>
            <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')">
              <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')">
                <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')" />
                <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')" />
              </f7-treeview-item>
              <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')">
                <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')" />
                <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')" />
              </f7-treeview-item>
            </f7-treeview-item>
            <f7-treeview-item :label="formatAddress('0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5')" />
          </f7-treeview> -->
        </f7-tab>
      </f7-tabs>
    </div>
  </f7-page>
</template>
<script setup lang="ts">
import ChildrenHeader from '../../components/header/childrenHeader.vue'
import userPerson from "@/pinia/person";
import type { TreeProps } from 'ant-design-vue';
import lang from '@/i18n/index'
import { f7, f7ready } from 'framework7-vue'
import { onMounted, onBeforeUnmount } from 'vue';
import request from "@/tools/request";
const person = userPerson();
const userinfo = $computed(() => person.userinfo);

let activeTab: string = $ref('0');
let pickerDevice: any = $ref(null);

const menuType: any[] = [
  ['0', lang('全部')],
  ['1', lang('挖矿')],
  ['8', lang('直推')],
  ['2', lang('分享')],
  ['4', lang('矩阵收益')],
  ['3', lang('前四名收益')],
  ['5', lang('兑换')],
  ['6', lang('提现')],
  ['7', lang('认购')]
]

onMounted(() => {
  f7ready(() => {
    pickerDevice = f7.picker.create({
      inputEl: '#demo-picker-device',
      value: [lang('全部')],
      toolbarCloseText: '完成',
      cols: [
        {
          textAlign: 'center',
          values: menuType.map(item => item[1]),
        },
      ],
      on: {
        change: function (picker, value: any, displayValue: any) {
          const activeData = menuType.find(item => item[1] === (value as any[])[0])
          activeTab = activeData[0]
        }
      }
    });
    console.log(pickerDevice)
  })
})

onBeforeUnmount(() => {
  pickerDevice.destroy()
})

const levelType: { [key: string]: string } = {
  '-1': lang('未激活'),
  '0': lang('节点'),
  '1': 'v1',
  '2': 'v2',
  '3': 'v3',
  '4': 'v4',
  '5': 'v5'
}

const expandedKeys = $ref<string[]>([]);
const selectedKeys = $ref<string[]>([]);
let treeData: any = $ref([]);

const onLoadData: TreeProps['loadData'] = (treeNode: any) => {
  console.log(treeNode)
  return new Promise<void>(async (resolve) => {
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }

    const res: any = await request.get(`app_server/user_area?locationId=${treeNode.dataRef.locationId}`);

    // res.area = [
    //   {
    //     address: formatAddress("aaaa12378123hjdfowis88883"),
    //     locationId: "3",
    //     countLow: 2,
    //   },
    //   {
    //     address: formatAddress("32423998f8uijkjkrejkw2223"),
    //     locationId: "4",
    //     countLow: 0
    //   }
    // ]
    setTimeout(() => {
      treeNode.dataRef.children = res.area.map((item: any, index: number) => {
        return {
          title: item.address,
          key: `${treeNode.eventKey}-${index}`,
          locationId: item.locationId,
          isLeaf: item.countLow === 0
        }
      })
      treeData = [...treeData];
      resolve();
    }, 1000);
  });
};

const formatAddress = (value: string) => {
  const frontSix = value.slice(0, 6);
  const backSix = value.slice(-4);
  const middle = '...';
  return frontSix + middle + backSix;
}

const getUserArea = async () => {
  const res: any = await request.get("app_server/user_area");
  // res.area = [
  //   {
  //     address: formatAddress("aaaa12378123hjdfowis88883"),
  //     locationId: "3",
  //     countLow: 2,
  //   },
  //   {
  //     address: formatAddress("32423998f8uijkjkrejkw2223"),
  //     locationId: "4",
  //     countLow: 0
  //   }
  // ]
  treeData = res.area.map((item: any, index: number) => {
    return {
      title: item.address,
      key: index,
      locationId: item.locationId,
      isLeaf: item.countLow === 0
    }
  })
}

getUserArea()


</script>
<style scoped lang="less">
@import "./styles/index.less";
</style>
