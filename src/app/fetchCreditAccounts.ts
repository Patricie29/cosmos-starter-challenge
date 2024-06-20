import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { contracts } from '@/app/config'
import { ExtendedHttpEndpoint } from '@cosmos-kit/core';

export async function fetchCreditAccounts(walletAddress: string, rpc: string | ExtendedHttpEndpoint): Promise<any> {

    const chainId = 'osmosis-1';

    await window.keplr.enable(chainId);
    const signer = window.keplr.getOfflineSigner(chainId) as OfflineSigner;

    const client = await SigningCosmWasmClient.connectWithSigner(
        rpc,
        signer
    );

    const query = {
        tokens: {
            owner: walletAddress
        }
    };

    try {
        const result = await client.queryContractSmart(contracts.contracts.accountNft, query);
        console.log(result, 'response')

        return result;

    } catch (error) {
        console.error('Failed to fetch credit accounts', error);
        return null;
    }
}
