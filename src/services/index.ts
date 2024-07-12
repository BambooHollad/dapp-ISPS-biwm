import biwMetaService from '@/services/biwmeta';
import { showFailToast } from "vant";
import { $WALLET_AUTHORIZE_ADDRESS_TYPE, $WALLET_PLAOC_PATH, $WALLET_SIGNATURE_TYPE, CHAIN_NAME, type $WEALLET_ADDRESS_RESPONSE } from '@/services/biwmeta/types';

type Props = {
  sign: string
}

class BiwMeta {
  signList: object[];
  signText: string
  constructor(props?: Props) {
    const { sign } = props || {}
    this.signText = sign || 'login'
    this.signList = []
  }
  getSign() {
    return this.signList
  }
  async getBalance () {
    if (!this.signList.address) {
      alert("未登录地址")
      return;
    }
    /// 看一下有没装应用
    const hasId = await biwMetaService.canOpenId(import.meta.env.VITE_BIW_META_ID);
    if (!hasId) {
      alert(`未安装BIW Meta(${import.meta.env.VITE_BIW_META_ID})`);
      return;
    }
    console.log(this.signList)
    const res = await biwMetaService.getBIWMetaAppData(
      import.meta.env.VITE_BIW_META_ID,
      $WALLET_PLAOC_PATH.signature,
      [{
        type: $WALLET_SIGNATURE_TYPE.assetTypeBalance,
        chainName: this.signContent.chainName,
        senderAddress: this.signContent.address,
        assetTypes: [{
          assetType: 'BIW', /// 币种
        }],
      }]
    );
    const data = await res.getData();
    /// 得到数据，聚焦本窗口才行
    await biwMetaService.focusWindow();
    if (data) {
      const res = data[0];
      if (res) {
        const assetTypeInfo = (data[0] as {
          [assetType: string]: {
            assetType: string,// 币种
            decimals: number,// 精度，用于页面展示转化，便于阅读
            balance: string,// 余额
            contracts?: string,// 合约
          } | undefined;
        })['BIW'];
        return assetTypeInfo?.balance || '0'
      } else {
        return '0'
      }
    }
    console.log("授权失败")
  }
  async sign() {
    try {
      const hasId = await biwMetaService.canOpenId(import.meta.env.VITE_BIW_META_ID);
      if (!hasId) {
        alert(`未安装BIW Meta(${import.meta.env.VITE_BIW_META_ID})`);
        return;
      }
      const res = await biwMetaService.getBIWMetaAppData(
        import.meta.env.VITE_BIW_META_ID,
        $WALLET_PLAOC_PATH.getAddress,
        {
          type: $WALLET_AUTHORIZE_ADDRESS_TYPE.main,
          chainName: CHAIN_NAME.BIWMeta,
          signMessage: this.signText,
        }
      );
      const data = await res.getData();
      /// 得到数据，聚焦本窗口才行
      await biwMetaService.focusWindow();
      if (data) {
        console.log(1, data)

        this.signList = data

        return data
      }
      showFailToast('签名失败')
      throw '签名失败' // 抛出错误信息
    } catch (error: any) {
      showFailToast('签名失败'); // 显示失败的提示信息
      throw '签名失败' // 抛出错误信息
    }
  }
}

export default BiwMeta