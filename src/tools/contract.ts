// 导入模块
import detectEthereumProvider from '@metamask/detect-provider'; // 用于检测以太坊提供者（例如MetaMask）
import { ethers, BigNumber } from "ethers"; // 导入 ethers 库中的 ethers 和 BigNumber 对象
import { showFailToast } from "vant"; // 导入用于显示提示信息的组件
import abi from "./abi.json"; // 导入智能合约 ABI
import lang from '@/i18n/index'
// import i18n from "../language"; // 导入国际化库
// const { t } = i18n.global; // 从国际化库中提取 t 函数
import biwMetaService from '@/services/biwmeta';
import Web3 from 'web3';
import { $WALLET_PLAOC_PATH, $WALLET_SIGNATURE_TYPE, $WEALLET_ADDRESS_RESPONSE, CHAIN_NAME } from '@/services/biwmeta/types';

// 设置超时时间和检查间隔
const timeout = 120000; // 2分钟
const checkInterval = 1000; // 1秒

// 等待交易上链
async function waitForTransaction(hash: string) {
    let receipt = null;
    let elapsed = 0;

    while (receipt === null && elapsed < timeout) {
        receipt = await web3.eth.getTransactionReceipt(hash);
        if (receipt === null) {
            await new Promise(resolve => setTimeout(resolve, checkInterval));
            elapsed += checkInterval;
        }
    }
    return receipt;
}

const web3 = new Web3('https://bsc-dataseed.binance.org/');
// const senderAddressPk = '';/// 确保跟你下面（链接钱包类）授权地址是同一个
// let _senderAddress = '';

// const getSenderAddress = async () => {
//     if (_senderAddress) {
//         return _senderAddress;
//     }
//     return _senderAddress = (await web3.eth.accounts.privateKeyToAccount(senderAddressPk)).address;
// }

// console.log("解析地址 =》 ", await getSenderAddress());
let _senderAddress = '';
/* 链接钱包类 */
export class ETH {
    public static provider: any = undefined;    // 提供者
    public static account: string = "";         // 钱包地址
    public static signer: any = undefined;       // 用户签名者

    public static biwMetaAddressList = [] as Array<$WEALLET_ADDRESS_RESPONSE>;
    public static loginAccount = undefined as undefined | $WEALLET_ADDRESS_RESPONSE;
    // 链接钱包返回钱包地址
    public static async getAccount(): Promise<string> {
        const ethereum: any = await detectEthereumProvider(); // 检测以太坊提供者
        if (!ethereum) { // 如果未检测到以太坊提供者
            showFailToast(lang('请安装钱包')); // 显示失败的提示信息
            throw lang('请安装钱包'); // 抛出错误信息
        }

        ETH.provider = new ethers.providers.Web3Provider(ethereum); // 使用 Web3Provider 创建提供者
        const chainId = Number(await ethereum.request({ method: 'eth_chainId' })); // 获取链ID
        if (chainId !== Number(import.meta.env.VITE_CHAINID)) { // 如果链ID不匹配
            showFailToast(lang('请连接BSC网络')); // 显示失败的提示信息
            throw lang('请连接BSC网络'); // 抛出错误信息
        }
        ETH.account = ethers.utils.getAddress((await ethereum.request({ method: 'eth_requestAccounts' }))[0]); // 获取钱包地址
        ETH.signer = ETH.provider.getSigner(); // 获取用户签名者
        return ETH.account; // 返回钱包地址
    }

    public static async getISPSBalance(): Promise<string> {
        const contract = new ethers.Contract(import.meta.env.VITE_ISPS, abi.ERC20, ETH.signer); // 创建合约对象
        const balance = await contract.balanceOf(ETH.account);
        return ethers.utils.formatUnits(balance, 'ether');
    }

    public static async getUSDTBalance() {
        const contract = new ethers.Contract(import.meta.env.VITE_USDT, abi.USDT, ETH.signer); // 创建合约对象

        try {
            // 调用balanceOf函数来获取USDT余额
            const balance = await contract.balanceOf(ETH.account);
            return ethers.utils.formatUnits(balance, 'ether');
        } catch (error) {
            console.error("获取USDT余额时出错:", error);
            return 0
        }
    }

    public static async getUsdtValueFromIsps(amount: any): Promise<string> {
        try {
            const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT, abi.ISPS, ETH.signer); // 创建合约对象
            const path = [import.meta.env.VITE_ISPS, import.meta.env.VITE_USDT];
            const amountsOut = await contract.getAmountsOut(ethers.utils.parseEther(amount), path);
            return ethers.utils.formatUnits(amountsOut[1].toString(), 'ether')
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    // 签名
    public static async signMessage(): Promise<string> {
        // 使用用户签名者签名消息并返回签名结果
        return await ETH.signer.signMessage(ETH.account)
    }

    // 将数字转换为指定精度的 BigNumber 对象
    static parseUnits(n: any, dec: number): BigNumber {
        return ethers.utils.parseUnits(`${n}`, dec); // 将数字转换为 BigNumber 对象
    }

    // 将 BigNumber 对象转换为指定精度的字符串
    static formatUnits(n: any, dec: number): string {
        return ethers.utils.formatUnits(n, dec); // 将 BigNumber 对象转换为字符串
    }

    // 格式化钱包地址
    static format_address(v: string, n: number = 8): string {
        const reg = new RegExp(`^(.{${n}})(.*)(.{${n}})$`, "ig"); // 创建正则表达式，用于格式化地址
        return v.replace(reg, "$1...$3"); // 格式化钱包地址
    }
}
const getSenderAddress = async () => {
    if (_senderAddress) {
        return _senderAddress;
    }
    return _senderAddress = (await web3.eth.accounts.privateKeyToAccount(senderAddressPk)).address;
}

/* 合约类 */
export class Contract {
    public address!: string;    // 合约地址
    public abiName!: string;    // abi名称
    // 构造函数
    constructor(address: string, abiName: string) {
        this.address = address; // 设置合约地址
        this.abiName = abiName; // 设置 abi 名称
    }

    // 获取合约实例
    getInsance() {
        console.log(444, this.abiName, this.address)
        /// 这里拿合约函数
        const contract = new web3.eth.Contract(
            (abi as any)[this.abiName],
            this.address,
        );
        console.log(555, contract.methods)
        return contract.methods;
    }

    // 调用合约方法
    async call(methods: string, params: any[] = []): Promise<any> {
        return await this.getInsance()[methods](...params).call(); // 调用合约方法
    }

    async send(methods: string, account: $WEALLET_ADDRESS_RESPONSE, params: any[] = []): Promise<void> {
        try {
            console.log(methods, params)
            let tx: any = {};
            try {
                /// 判断是否有对应的地址
                if (!account) {
                    throw new Error("未登录地址");
                }
                if (account.chainName !== CHAIN_NAME.Binance) {
                    throw new Error("当前登录地址不是bsc链的");
                }

                /// 访问biw
                const res = await biwMetaService.getBIWMetaAppData(
                    import.meta.env.VITE_BIW_META_ID,
                    $WALLET_PLAOC_PATH.signature,
                    [{
                        "type": $WALLET_SIGNATURE_TYPE.contract,
                        "chainName": account.chainName,
                        "methods": methods,
                        "params": params,
                        "senderAddress": account.address,
                        "receiveAddress": this.address,
                        "data": await (this.getInsance()[methods](...params)).encodeABI(),

                        boradcast: true, // 是否帮广播
                        waitTrsInBlock: true, // 是否等待上链
                        waitTime: 6000 // 等1分钟
                    }]
                );
                const data = await res.getData();
                /// 得到数据，聚焦本窗口才行
                await biwMetaService.focusWindow();

                console.log(7777, data)
                if (data) {
                    console.log(8888)
                    const trxInfo = data[0] as {
                        txId: string, // 交易的ID
                        transaction: string
                    } | undefined;
                    console.log(9999, trxInfo)
                    if (trxInfo) {
                        tx.hash = trxInfo.txId;
                        const rawTransaction = trxInfo.transaction; ///
                        if (rawTransaction) {
                            console.log('0000', rawTransaction)
                            /// 广播交易
                            await web3.eth.sendSignedTransaction(rawTransaction);
                        } else {
                            throw new Error("生成交易失败");
                        }
                    }
                    throw new Error("签名失败");
                }
                throw new Error("取消签名")

            } catch (error: any) {
                console.log('错误', error);
                const errorMessage = typeof error === "string" ? error : error.message;
                if (!(error.code === "INVALID_ARGUMENT" && error.reason === "missing from address")) { // 如果不是因为缺少地址导致的错误
                    throw error; // 抛出错误
                };

                if (errorMessage === "TIME_OUT") { // 超时
                    /// 超时处理....
                    // throw error; // 抛出错误
                };

                throw error; // 抛出错误
            }


            // let receipt = await ETH.provider.waitForTransaction(tx.hash); // 等待交易确认
            // if (receipt.status === 1) { // 如果交易成功
            //     // alert("交易成功");
            // } else {
            //     throw lang('交易失败') // 抛出错误信息
            // }

            /// 广播成功不一定会上链 小概率
            console.log('广播成功', tx.hash);
            /// 等待交易
            if (tx.hash) {
                await waitForTransaction(tx.hash).then(receipt => {
                    if (receipt) {
                        console.log("交易上链了:", receipt.transactionHash);
                    } else {
                        throw new Error("等待交易上链超时。");
                    }
                }).catch(error => {
                    console.error("等待交易过程中发生错误:", error);
                    throw error;
                });
            }
        } catch (error: any) {
            let msg: any = "";
            console.log(error)
            if (error.data) msg = error.data.message;
            else if (/^Error/ig.test(error.toString())) msg = lang('交易失败');
            else if (error.message) msg = error.message;
            else msg = error;
            showFailToast(msg); // 显示失败的提示信息
            throw lang('交易失败') // 抛出错误信息
        }
    }
}