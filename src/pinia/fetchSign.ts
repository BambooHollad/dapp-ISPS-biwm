import { showFailToast } from "vant"; // 导入用于显示提示信息的组件
import biwMetaService from '@/services/biwmeta';
import { $WALLET_AUTHORIZE_ADDRESS_TYPE, $WALLET_PLAOC_PATH, $WALLET_SIGNATURE_TYPE, CHAIN_NAME, type $WEALLET_ADDRESS_RESPONSE } from '@/services/biwmeta/types';
import lang from '@/i18n/index'

const fetchSign = async () => {
  let signStorage = localStorage.getItem('sign')

  if (!signStorage) {
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
          signMessage: '1234',
        }
      );
      const data = await res.getData();
      /// 得到数据，聚焦本窗口才行
      await biwMetaService.focusWindow();
      if (data) {
        return data.find(item => item.name === 'BIW')
      }
      showFailToast(lang('签名失败'))
      throw lang('签名失败') // 抛出错误信息
    } catch (error: any) {
      showFailToast(lang('签名失败')); // 显示失败的提示信息
      throw lang('签名失败') // 抛出错误信息
    }
  }
}

export default fetchSign