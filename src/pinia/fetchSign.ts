import { showFailToast } from "vant"; // 导入用于显示提示信息的组件
import { ETH } from "@/tools/contract";
import lang from '@/i18n/index'

const fetchSign = async () => {
  let signStorage = localStorage.getItem('sign')
  const account = await ETH.getAccount();
  const accountLac = localStorage.getItem("account");

  if (account !== accountLac) {
    localStorage.removeItem('sign')
    signStorage = null
  }

  if (!signStorage) {
    try {
      const sign = await ETH.signMessage();
      localStorage.setItem('sign', sign)
      return sign
    } catch (error: any) {
      showFailToast(lang('签名失败')); // 显示失败的提示信息
      throw lang('签名失败') // 抛出错误信息
    }
  }
  return signStorage
}

export default fetchSign