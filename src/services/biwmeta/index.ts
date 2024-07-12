import { dwebServiceWorker, windowPlugin } from "@plaoc/plugins"
import { type $WALLET_PLAOC_PATH_RESPONSE, type $WALLET_PLAOC_PATH_REQUEST_PARAMETER, $WALLET_PLAOC_PATH, type $WEALLET_SIGNATURE_RESPONSE, $WALLET_SIGNATURE_TYPE } from "./types";
import { PromiseOut } from "@bnqkl/util-web/extends-promise-out";

/** 是否有安装应用 */
const canOpenId = (id: `${string}.dweb`) => dwebServiceWorker.has(id);

/** 窗口最大化
 *  该api正常是项目启动的时候调用，不然应用是窗口模式
 */
const appMaximize = () => windowPlugin.maximize();

/** 应用聚焦 */
const focusWindow = () => windowPlugin.focusWindow();

/** 重启 */
const restart = () => dwebServiceWorker.restart();

/** 调用对应biw钱包获取相对应数据 */
const getBIWMetaAppData = <
    T extends keyof $WALLET_PLAOC_PATH_RESPONSE,
    U extends $WALLET_PLAOC_PATH_REQUEST_PARAMETER[T],
>(id: `${string}.dweb`, pathname: T, search?: any) => {
    let signaturedata = '';
    let activate = true; // 是否激活对方应用界面
    const url = new URL(pathname, `file://${id}`);
    if (search) {
        if (pathname === $WALLET_PLAOC_PATH.signature) {
            signaturedata = JSON.stringify(search);
            if (search && search.length === 1) {
                const item = search[0];
                if (item.type === $WALLET_SIGNATURE_TYPE.assetTypeBalance) {
                    activate = false;
                }
            }
        } else {
            for (const key in search) {
                url.searchParams.set(key, search[key]);
            }
        }
    }
    const init = {
        activate, // 是否激活对方应用界面
        method: "POST",
        body: signaturedata,
    };
    const promiseOut = new PromiseOut<$WALLET_PLAOC_PATH_RESPONSE[T]>();
    dwebServiceWorker.fetch(url.href, init)
        .then(async (res) => {
            if (res.ok) {
                const dataJson = await res.json();
                const data = dataJson.data as $WALLET_PLAOC_PATH_RESPONSE[T];
                if (data) {
                    /// 有返回，排查下有没抛错的情况
                    const errorItem = data.find(item => {
                        if (item && typeof item === "object" && 'error' in item) {
                            if (item.error) {
                                return true;
                            }
                        }
                        return false;
                    });
                    if (errorItem) {
                        promiseOut.reject(new Error((errorItem as { message: string }).message));
                        throw new Error((errorItem as { message: string }).message); 
                    }
                }
                promiseOut.resolve(data);
                return res;
            } else {
                const error = await res.text();
                promiseOut.reject(new Error(error));
                return;
            }
        })
        .catch(err => {
            promiseOut.reject(err);
        })
    return {
        getData: () => {
            return promiseOut.promise;
        },
        abort: () => {
            return promiseOut.reject(new Error("request abort"));
        }
    }
}
export default {
    canOpenId,
    appMaximize,
    restart,
    getBIWMetaAppData,
    focusWindow,
}