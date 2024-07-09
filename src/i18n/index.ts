import i18n from "@/language";
import CryptoJS from 'crypto-js';

const lang = (text: string, variables: any = {}) => {
    let hashKey = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
    // console.log(hashKey)
    let words = i18n.global.t(hashKey, variables);

    if (words == hashKey) {
        words = text;
    }
    return words;
  }

export default lang