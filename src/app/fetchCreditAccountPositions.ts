import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import { contracts } from '@/app/config'
import { ExtendedHttpEndpoint } from '@cosmos-kit/core';

export const fetchCreditAccountPositions = async (rpcEndpoint: string | ExtendedHttpEndpoint, accountId: string) => {
    if (!rpcEndpoint || !accountId) return;

    try {
        const chainId = 'osmosis-1';
        await window.keplr.enable(chainId);
        const signer = window.keplr.getOfflineSigner(chainId);

        const client = await SigningCosmWasmClient.connectWithSigner(
            rpcEndpoint,
            signer,
            { gasPrice: GasPrice.fromString("0.025uosmo") }
        );

        const queryMsg = {
            positions: {
                account_id: accountId
            }
        };

        const result = await client.queryContractSmart(contracts.contracts.creditManager, queryMsg);
        console.log(result, 'result')

        return result;

    } catch (error) {
        console.error('Failed to fetch credit account positions:', error);
    }
};
