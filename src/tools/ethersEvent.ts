import { ethers,BigNumber } from "ethers"; // 导入 ethers 库中的 ethers 和 BigNumber 对象

class EthereumHelper {
    public static provider: any = null;

    constructor(providerUrl: any) {
      EthereumHelper.provider = new ethers.providers.JsonRpcProvider(providerUrl);
    }

    async getBalance(address: string) {
        try {
            const balance = await EthereumHelper.provider.getBalance(address);
            return ethers.utils.formatEther(balance);
        } catch (error) {
            console.error("获取余额时出错:", error);
            throw error;
        }
    }

    async getTokenBalance(tokenAddress: string, ownerAddress: string) {
        const tokenAbi = ["function balanceOf(address) view returns (uint256)"];
        const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, EthereumHelper.provider);
        try {
            const balance = await tokenContract.balanceOf(ownerAddress);
            return ethers.utils.formatUnits(balance, 18);
        } catch (error) {
            console.error("获取代币余额时出错:", error);
            throw error;
        }
    }

    async sendTransaction(sender: any, recipient: any, amount: any, privateKey: any) {
        const wallet = new ethers.Wallet(privateKey, EthereumHelper.provider);
        const tx = {
            to: recipient,
            value: ethers.utils.parseEther(amount)
        };
        try {
            const txResponse = await wallet.sendTransaction(tx);
            await txResponse.wait();
            return txResponse.hash;
        } catch (error) {
            console.error("发送交易时出错:", error);
            throw error;
        }
    }

    async estimateGasLimit(sender: any, recipient: any, amount: any) {
        const gasPrice = await EthereumHelper.provider.getGasPrice();
        const wallet = new ethers.Wallet(sender.privateKey, EthereumHelper.provider);
        const tx = {
            to: recipient,
            value: ethers.utils.parseEther(amount),
            gasPrice: gasPrice
        };
        try {
            const estimatedGasLimit = await wallet.estimateGas(tx);
            return estimatedGasLimit.toString();
        } catch (error) {
            console.error("估算Gas时出错:", error);
            throw error;
        }
    }
}

export default EthereumHelper