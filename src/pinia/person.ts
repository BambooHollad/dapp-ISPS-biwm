import { defineStore } from "pinia";
import { ETH } from "@/tools/contract";
import request from "@/tools/request";
import BiwMeta from '@/services/index'
import { f7 } from 'framework7-vue'
import { $WALLET_AUTHORIZE_ADDRESS_TYPE, $WALLET_PLAOC_PATH, $WALLET_SIGNATURE_TYPE, CHAIN_NAME, type $WEALLET_ADDRESS_RESPONSE } from '@/services/biwmeta/types';
let timeSwitch: any = null//定时获取用户信息

export default defineStore("person", {
  state: () => ({
    loadAccount: false,
    isLogin: false,
    userinfo: {
      account: "",
      address: "",
      amount: "0",
      balanceBiw: "10.33",
      amount2: "0",
      amountB: "0",
      balanceUsdt: "0",
      col: "0",
      feeDaily: "0",
      inviteUrl: "RDQ=",
      inviteUserAddress: "0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5",
      level: "0",
      locationCount: "0",
      LocationTotal: "0",
      poolAmount: "0",
      recommendNum: "0",
      recommendNumAll: "0",
      recommendTeamAll: "0",
      recommendTeamNum: "0",
      recommendVipTotal: "0",
      time: 1711980000000,
      row: "0",
      todayReward: "0",
      topUser: [],
      total: "0",
      totalDeposit: "0",
      usdt: "",
      userCount: "0",
      withdrawAmount: "0",
      balanceDhb: "0",
      recommendTop: "0",
      locationTotalCol: "0",
      locationTotalRow: "0",
      fybPrice: "0",
      fybRate: "0",
      recommendAreaTotal: "0",
      areaAmount: "0",
      areaMaxAmount: "0",
      locationDailyTotal: "0",
      areaName: "",
      recommendRewardTotal: "0",
      rewardWithdraw: "0",
      recommendRewardDhbTotal: "0",
      withdrawAmount2: "0",
      balanceUsdt2: "0",
      withdrawAll: "0",
      biwPrice: 0.1,
      buyNumTwo: 8,
      buyNumThree: 5,
      buyNumFour: 6,
      buyNumFive: 7,
      buyNumOne: 6,
      buyNumSix: 6,
      sellNumOne: 4,
      sellNumTwo: 2,
      sellNumThree: 5,
      sellNumFour: 4,
      sellNumFive: 3,
      sellNumSix: 3,
      count: 12,
      listRecommend: [{
        address: ''
      }],
      status: "running",
      withdrawList: [
        {
          createdAt: '2024-01-01 12:22:12',
          amount: 322
        }
      ],
      LocationList: [
        {
          current: "0.0000",
          currentMaxSubCurrent: "750.0000",
          amount: "300.0000",
        },
      ],
      listReward: [
        {
          createdAt: '2024-01-01 12:22:12',
          type: '2',
          reward: 322
        }
      ],
      four: [
        {amount: "300", reward: "0.0000", location: ''}
      ],
      areaMax: 0,
      areaMin: 0,
      areaAll: 0,
      recommendTotal: 0,
      locationUsdt: 0,
      locationCurrentMaxSub: 0,
      locationCurrentSub: 0,
      locationReward: 0,
      recommendReward: 0,
      areaReward: 0,
      fourReward: 0,
      fourRewardPoolYes: 0,
      fourRewardPool: 0,
      exchangeRate: 0.1,
      lastLevel: '-1',
      configOne: '100',
      configTwo: '100',
      configThree: '100',
      configFour: '100',
      biwBalance: '0',
      rewardFirst: 0,
      rewardSecond: 0,
      rewardThird: 0,
      first: [
        {
          address: '12813728913788333'
        },
        {
          address: '12813728913788333'
        }
      ],
      Second: [
        {
          address: '8x813728913788333'
        },
        {
          address: '7x813728913788333'
        }
      ]
    },
    biwSign: {},
    signList: [],
    urlCode: "",
    inviteUserAddress: "",
  }),
  actions: {
    // 系统初始化
    async init() {
      // const biwMeta = new BiwMeta()
      // const sign = await biwMeta.sign()
      // console.log(sign)
      // const balance = await biwMeta.getBalance()
      // console.log(balance)
      // this.isLogin = true;
      // await this.inputInvitationCode()
      // return
      let url = window.location.href;
      let code = $ref("");

      const accountLac = localStorage.getItem("account");
      this.loadAccount = true;
      const login = async (params: any): Promise<string> => {
        let res: any = await request.post("app_server/eth_authorize", params);
        return res.token;
      };

      localStorage.removeItem("buytime");

      const biwMeta = new BiwMeta()
      const signList = await biwMeta.sign() as any
      const biwSign: $WEALLET_ADDRESS_RESPONSE = signList.find((item: any) => item.name === 'BIW') as $WEALLET_ADDRESS_RESPONSE
      console.log(555, signList)
      this.biwSign = biwSign as $WEALLET_ADDRESS_RESPONSE
      this.signList = signList
      // this.userinfo.biwBalance = await biwMeta.getBalance() as string

      /* 判断是否本地token */
      if (accountLac && accountLac === biwSign?.address) {
        this.loginSuccess();
        return;
      }

      try {
        // 判断是否直接进入系统
        this.loginSuccess(
          await login({ address: biwSign?.address, publicKey: biwSign.publicKey, code: "", sign: biwSign?.signMessage, noMsg: true })
        );
      } catch (err) {
        const code = await this.inputInvitationCode()
        // 根据推荐码进入系统
        this.loginSuccess(
          await login({ address: biwSign?.address, publicKey: biwSign.publicKey, code, sign: biwSign?.signMessage, loading: true })
        );
      }
    },
    async inputInvitationCode() {
      return new Promise((resolve, reject) => {
        f7.dialog.create({
          title: '输入邀请码',
          text: '　　',
          content: '<div class="dialog-input-field item-input">' +
                    '<div class="item-input-wrap">' +
                      '<input type="text" class="dialog-input">' +
                    '</div>' +
                  '</div>',
          buttons: [
            {
              text: '确定',
              bold: true,
              onClick: function (dialog, e) {
                var code = dialog.$el.find('.dialog-input').val();
                if (!code.trim()) {
                  f7.dialog.alert('邀请码不能为空', '错误', function() {
                    dialog.open();
                  });
                } else {
                  resolve(code)
                }
              }
            }
          ],
          on: {
            open: function (dialog) {
              dialog.$el.find('.dialog-input').focus();
            }
          }
        }).open();
        // f7.dialog.prompt('', '输入邀请码', (code) => {
        //   if (!code.trim()) {
        //     reject('')
        //   } else {
        //     resolve(code)
        //   }
        // })
      })
    },
    /* 获取用户信息 */
    async getuser() {
      const getData = async () => {
        let res: any = await request.get("app_server/user_info");
        this.userinfo = res;
      };
      clearInterval(timeSwitch);
      await getData();
      timeSwitch = setInterval(getData, 30000);
    },
    /* 登录成功 */
    async loginSuccess(token?: string) {
      const { address } = this.biwSign as $WEALLET_ADDRESS_RESPONSE
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("account", address || '');
      }
      await this.getuser();
      await this.recommend_update();
      this.isLogin = true;
      location.hash = "";
      this.urlCode = "";
    },
    /* 更新推荐关系 */
    async recommend_update() {
      // const sign = await fetchSign()

      if (
        this.userinfo.LocationList.length === 0 &&
        this.urlCode &&
        this.urlCode !== this.inviteUserAddress
      ) {
        let res: any = await request.post("app_server/recommend_update", {
          code: this.urlCode,
          sign: this.biwSign?.signMessage
        });
        this.inviteUserAddress = res.inviteUserAddress;
      }
    },
    /* 自动退出系统 */
    outLogin() {
      localStorage.clear();
      this.$reset();
      this.init();
    },
  },
});