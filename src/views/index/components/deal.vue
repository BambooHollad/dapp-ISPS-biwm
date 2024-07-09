<template>
  <div class="deal">
    <ul class="deal-menu">
      <li @click="tabMenu = 1" :class="{ 'selected-menu': tabMenu === 1 }">IDO</li>
      <li @click="tabMenu = 2" :class="{ 'selected-menu': tabMenu === 2 }">{{ lang('认购记录') }}</li>
      <li @click="tabMenu = 3" :class="{ 'selected-menu': tabMenu === 3 }">{{ lang('挖矿收益') }}</li>
      <!-- <li @click="tabMenu = 4" :class="{'selected-menu': tabMenu === 4}">{{lang('提现')}}</li> -->
    </ul>
    <div class="deal-list" v-show="tabMenu === 1">
      <div class="content-box" v-for="(item, index) in idoList" :key="index">
        <div class="commodity-box">
          <div class="commodity-column">
            <p>{{ lang('节点') }}</p>
            <p class="commodity-providers"><i class="commodity-avatar"></i>USDT</p>
          </div>
          <div class="commodity-column">
            <p>{{ lang('可购买量') }}</p>
            <p class="commodity-quantity">
              <span>{{ lang('剩余') }} {{ item.percentage.toFixed(2) }}%</span>
              <span class="commodity-quantity-line">
                <i class="commodity-quantity-progress" :style="`width: ${item.percentage}%`"></i>
              </span>
            </p>
          </div>
          <div class="commodity-column">
            <p>{{ lang('数量') }}</p>
            <p>{{ item.count }}</p>
          </div>
          <div class="commodity-column">
            <p class="shop-box">
              <f7-button class="shop-btn" :disabled="userinfo.status !== 'stop' || true"
                @click="usdtApproved ? transferUsdt(item.type, false) : usdtApprove()" :loading="loading" fill>{{
                  lang('单币购买') }}</f7-button>
              <f7-button class="shop-btn" :disabled="userinfo.status !== 'stop'"
                @click="(usdtApproved && ispsApproved) ? transferUsdt(item.type, true) : mergeApprove()"
                :loading="loading" fill>{{ lang('双币购买') }}</f7-button>
              <!-- <div class="shop-btn" @click="usdtApproved ? transferUsdt(index, false) : usdtApprove()" :class="{'loading': loading}">{{lang('购买')}}</div>
              <div class="shop-btn" @click="(usdtApproved && ispsApproved) ? transferUsdt(index, true) : mergeApprove()" :class="{'loading': loading}">{{lang('联合购买')}}</div> -->
            </p>
          </div>

        </div>
      </div>
    </div>
    <div class="deal-list" v-show="tabMenu === 2">
      <div class="content-box" v-for="(item, index) in userinfo.LocationList" :key="index">
        <div class="order-box">
          <div class="order-column">
            <p>{{ lang('节点') }}</p>
            <p>{{ item.amount }}</p>
          </div>
          <div class="order-column">
            <p>{{ lang('挖矿') }}</p>
            <p>{{ item.currentMaxSubCurrent }}</p>
          </div>
          <div class="order-column">
            <p>{{ lang('收益') }}</p>
            <p>{{ item.current }}</p>
          </div>
          <div class="order-column">
            <p>{{ lang('出局') }}</p>
            <p>{{ userinfo.count }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="deal-list" v-show="tabMenu === 3">
      <div class="content-box" v-if="userinfo.listReward.length > 0">
        <div class="income-list">
          <div class="income-item" v-for="(item, index) in userinfo.listReward" :key="index">
            <div class="income-item-info">
              <p>{{ incomeType[item.type] }}</p>
              <p>{{ item.createdAt }}</p>
            </div>
            <div class="income-item-money">{{ item.reward }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="deal-list" v-show="tabMenu === 4">
      <div class="content-box" v-if="userinfo.withdrawList.length > 0">
        <div class="income-list">
          <div class="income-item" v-for="(item, index) in userinfo.withdrawList" :key="index">
            <div class="income-item-info">
              <p>{{ item.createdAt }}</p>
            </div>
            <div class="income-item-money">{{ item.amount }}</div>
          </div>
        </div>
      </div>
    </div>
    <Exchange v-if="isPopupOpened" @close="changePopup(false)" />
  </div>
</template>

<script setup lang="ts">
import Exchange from './exchange.vue'
import userPerson from "@/pinia/person";
import userSystem from "@/pinia/system";
import { Contract, ETH } from "@/tools/contract";
import lang from '@/i18n/index'
import Web3 from 'web3';
import { showDialog } from "vant";



const USDT: Contract = new Contract(import.meta.env.VITE_USDT, "ERC20");
const ISPS: Contract = new Contract(import.meta.env.VITE_ISPS, "ERC20");
const BUY: Contract = new Contract(import.meta.env.VITE_BUY, "BUY");

let loading = $ref(true);
const system = userSystem();
const person = userPerson();
const userinfo = $computed(() => person.userinfo);

let bugNumList = ['300', '1000', '3000', '5000', '10000', '100']
const incomeType: { [key: string]: string } = {
  '1': lang('挖矿收益'),
  '2': lang('分享收益'),
  '3': lang('前四名收益'),
  '4': lang('矩阵收益'),
  '5': lang('兑换'),
  '6': lang('提现'),
  '7': lang('认购')
}

let usdtApproved = $ref(false);
let ispsApproved = $ref(false);
// const getNewApproved = async () => {
//   const res = await BUY2.call("allowance", [ETH.account, BUY.address])

//   console.log(res)
// }
/* 获取授权 */
const getUsdtApproved = async () => {
  let res = await USDT.call("allowance", [ETH.account, BUY.address]);
  usdtApproved = Number(res) > 0;
  return usdtApproved
}
/* 获取授权 */
const getIspsApproved = async () => {
  let res = await ISPS.call("allowance", [ETH.account, BUY.address]);
  ispsApproved = Number(res) > 0;
  return ispsApproved
}

const mergeApprove = async () => {
  loading = true
  try {
    if (!usdtApproved) {
      await USDT.send("approve", [
        BUY.address,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      ])
      await getUsdtApproved()
    }
    if (!ispsApproved) {
      await ISPS.send("approve", [
        BUY.address,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      ])
      await getIspsApproved()
    }
    loading = false
  } catch (error) {
    loading = false
    console.log(error)
  }
}

const usdtApprove = () => {
  USDT.send("approve", [
    BUY.address,
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ]).then(getUsdtApproved).catch(() => loading = false);
}

getUsdtApproved()
getIspsApproved()

/* USDT转账 */
const transferUsdt = async (type: number, state: boolean) => {
  loading = true;
  person.userinfo.status = 'running'
  // BUY.send("buy", [type, state],).then(() => {
  //     loading = false;
  //     system.setBuyTime();
  //     showDialog({
  //       title: lang('提示'),
  //       message: lang(`USDT 转账成功！`),
  //       theme: 'round-button',
  //       confirmButtonColor: "#242738",
  //       confirmButtonText: lang('我知道了！'),
  //     })
  // }).catch(() => loading = false); 
  {
    /// 这边是为了做测试，先把代码都写在这，能用后再调整

    // BSC节点的HTTP提供者URL, binance提供的，这个是正式网络，如果你们自己有部署节点，可以指向对应的
    const bscNodeUrl = 'https://bsc-dataseed.binance.org/'; // 或者其他BSC节点URL

    // 创建Web3实例，并指定节点URL
    const web3 = new Web3(new Web3.providers.HttpProvider(bscNodeUrl));


    const senderAddressPk = "这里填入地址私钥";
    const senderAddress = (await web3.eth.accounts.privateKeyToAccount(senderAddressPk)).address;
    const nonce = await web3.eth.getTransactionCount(senderAddress);




    /// 获取对应函数, 由于是传入buy的abi，所以只返回buy，如果全部abi传递，就返回全部函数
    const buyContract = new web3.eth.Contract(
      /// BUY内的buy 
      [{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "num",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "use",
            "type": "bool"
          }
        ],
        "name": "buy", ///这个就是函数名
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      /// BUY合约地址
      import.meta.env.VITE_BUY,
    );


    /// 构建交易
    const txParams = {
      gas: 210000,
      gasPrice: 5000000000, /// gas跟gasPrice根据你们的来，我这边为了好测试 直接写死的
      nonce,
      // value: "0",
      chainId: await web3.eth.getChainId(),
      to: import.meta.env.VITE_BUY,
      /// data就是调用buy返回后的合约信息数据
      data: await buyContract.methods.buy(
        type,
        state
      ).encodeABI(),
    };
    console.log("txParams", txParams);
    /// 交易构建好了，签名一下
    const trxInfo = await web3.eth.accounts.signTransaction(txParams, senderAddressPk);
    console.log("trxInfo =>", trxInfo);
    const txId = trxInfo.messageHash;
    const rawTransaction = trxInfo.rawTransaction; /// 
    if (rawTransaction) {
      /// 广播交易
      try {
        await web3.eth.sendSignedTransaction(rawTransaction);
        /// 广播成功不一定会上链 小概率
        console.log('广播成功', txId);
        loading = false;
        system.setBuyTime();
        showDialog({
          title: lang('提示'),
          message: lang(`USDT 转账成功！`),
          theme: 'round-button',
          confirmButtonColor: "#242738",
          confirmButtonText: lang('我知道了！'),
        })
      } catch (err) {
        loading = false;
        console.error(err);
      }
    } else {
      console.error(trxInfo, "不含rawTransaction");
    }
  }
}

let idoList = [
  {
    count: 100,
    type: 6,
    buyNum: userinfo.buyNumSix,
    sellNum: userinfo.sellNumSix,
    percentage: userinfo.buyNumSix / (userinfo.buyNumSix + userinfo.sellNumSix) * 100
  },
  {
    count: 300,
    type: 1,
    buyNum: userinfo.buyNumOne,
    sellNum: userinfo.sellNumOne,
    percentage: userinfo.buyNumOne / (userinfo.buyNumOne + userinfo.sellNumOne) * 100
  },
  {
    count: 1000,
    type: 2,
    buyNum: userinfo.buyNumTwo,
    sellNum: userinfo.sellNumTwo,
    percentage: userinfo.buyNumTwo / (userinfo.buyNumTwo + userinfo.sellNumTwo) * 100
  },
  {
    count: 3000,
    type: 3,
    buyNum: userinfo.buyNumThree,
    sellNum: userinfo.sellNumThree,
    percentage: userinfo.buyNumThree / (userinfo.buyNumThree + userinfo.sellNumThree) * 100
  },
  {
    count: 5000,
    type: 4,
    buyNum: userinfo.buyNumFour,
    sellNum: userinfo.sellNumFour,
    percentage: userinfo.buyNumFour / (userinfo.buyNumFour + userinfo.sellNumFour) * 100
  },
  {
    count: 10000,
    type: 5,
    buyNum: userinfo.buyNumFive,
    sellNum: userinfo.sellNumFive,
    percentage: userinfo.buyNumFive / (userinfo.buyNumFive + userinfo.sellNumFive) * 100
  }
]

let tabMenu = $ref(1)
let isPopupOpened = $ref(false)

// Get the router instance

// Expose router to be used in the template
// const $router = route.router

const changePopup = (value: boolean) => {
  isPopupOpened = value
}
</script>
<style scoped lang="less">
@import "../styles/deal.less";
</style>
