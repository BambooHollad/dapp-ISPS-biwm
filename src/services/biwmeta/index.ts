import { dwebServiceWorker, windowPlugin } from "@plaoc/plugins"
import { type $WALLET_PLAOC_PATH_RESPONSE, type $WALLET_PLAOC_PATH_REQUEST_PARAMETER, $WALLET_PLAOC_PATH, type $WEALLET_SIGNATURE_RESPONSE } from "./types";
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
>(id: `${string}.dweb`, pathname: T, search?: U) => {
    let signaturedata = '';
    const url = new URL(pathname, `file://${id}`);
    if (search) {
        if (pathname === $WALLET_PLAOC_PATH.signature) {
            signaturedata = JSON.stringify(search);
        } else {
            for (const key in search) {
                // @ts-ignore
                url.searchParams.set(key, search[key]);
            }
        }
    }
    const promiseOut = new PromiseOut<$WALLET_PLAOC_PATH_RESPONSE[T]>();
    dwebServiceWorker.fetch(url.href, {
        method: "POST",
        body: signaturedata,
    })
        .then(async (res) => {
            if (res.ok) {
                const dataJson = await res.json();
                promiseOut.resolve(dataJson.data);
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