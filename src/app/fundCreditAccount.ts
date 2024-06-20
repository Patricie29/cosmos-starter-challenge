import toast from "react-hot-toast";
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import { contracts } from '@/app/config'

export const fundCreditAccount = async (accountId: string, rpc: any, address: any) => {

    try {
        const chainId = 'osmosis-1';
        await window.keplr.enable(chainId);
        const signer = window.keplr.getOfflineSigner(chainId);

        const client = await SigningCosmWasmClient.connectWithSigner(
            rpc,
            signer,
            { gasPrice: GasPrice.fromString("0.025uosmo") }
        );

        const msg = {
            "update_credit_account": {
                "account_id": accountId,
                "actions": [
                    {
                        "deposit": {
                            "denom": "uosmo",
                            "amount": "1000000"
                        }
                    }
                ]
            }
        };

        const result = await client.execute(
            address,
            contracts.contracts.creditManager,
            msg,
            'auto',
            'auto',
            [{ denom: "uosmo", amount: "1000000" }]
        );


        console.log(result, 'Funding result')
        toast.success('Successfully funded credit account!')

    } catch (error) {
        toast.error('There was an error, please try again!')
        console.error('Failed to fund credit account', error);
    }
};
