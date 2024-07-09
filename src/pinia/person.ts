import { defineStore } from "pinia";
import { ETH } from "@/tools/contract";
import request from "@/tools/request";
import fetchSign from './fetchSign'
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
      configFour: '100'
    },
    urlCode: "",
    inviteUserAddress: "",
  }),
  actions: {
    // 系统初始化
    async init() {
      let url = window.location.href;
      let code = $ref("");
      if (/inviteCode/.test(url)) {
        code = url.replace(/^(.*)(-inviteTdh-)(.*)(-inviteTdh-)(.*)$/gi, "$3");
        this.urlCode = code;
      }
      const account = await ETH.getAccount();
      // const sign = await ETH.signMessage();
      const accountLac = localStorage.getItem("account");
      this.loadAccount = true;
      const login = async (params: any): Promise<string> => {
        let res: any = await request.post("app_server/eth_authorize", params);
        return res.token;
      };
      const sign = await fetchSign()

      /* 判断是否本地token */
      if (accountLac === account) {
        this.loginSuccess();
        return;
      }
      localStorage.removeItem("buytime");
      try {
        // 判断是否直接进入系统
        this.loginSuccess(
          await login({ address: ETH.account, code: "", sign, noMsg: true })
        );
      } catch (err) {
        // 根据推荐码进入系统
        this.loginSuccess(
          await login({ address: ETH.account, code, sign, loading: true })
        );
      }
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
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("account", ETH.account);
      }
      await this.getuser();
      await this.recommend_update();
      this.isLogin = true;
      location.hash = "";
      this.urlCode = "";
    },
    /* 更新推荐关系 */
    async recommend_update() {
      const sign = await fetchSign()

      if (
        this.userinfo.LocationList.length === 0 &&
        this.urlCode &&
        this.urlCode !== this.inviteUserAddress
      ) {
        let res: any = await request.post("app_server/recommend_update", {
          code: this.urlCode,
          sign
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