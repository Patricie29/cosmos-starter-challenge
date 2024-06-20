'use client'

import React, { useState } from 'react';
import { useChain } from "@cosmos-kit/react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from 'osmojs';
import { GasPrice } from '@cosmjs/stargate';
import toast, { Toaster } from 'react-hot-toast';
import { fetchCreditAccounts } from '../fetchCreditAccounts';
import { ExtendedHttpEndpoint } from '@cosmos-kit/core';
import { contracts } from '@/app/config'


interface MintAccountBtnProps {
    address: string;
    handleUpdateCreditAccounts: (accounts: string[], rpc: string | ExtendedHttpEndpoint) => void;
}

const MintAccountBtn: React.FC<MintAccountBtnProps> = ({ address, handleUpdateCreditAccounts }) => {

    const [isMinting, setIsMinting] = useState<boolean>(false);
    const { wallet, getRpcEndpoint } = useChain('osmosis');

    const mintCreditAccount = async () => {
        if (!wallet) return;

        const rpcEndpoint = await getRpcEndpoint();
        if (!rpcEndpoint) {
            toast.error('Failed to get RPC endpoint');
            return;
        }

        try {
            setIsMinting(true);
            const chainId = 'osmosis-1';
            await window.keplr.enable(chainId);
            const signer = window.keplr.getOfflineSigner(chainId);

            const client = await SigningCosmWasmClient.connectWithSigner(
                rpcEndpoint,
                signer,
                { gasPrice: GasPrice.fromString("0.025uosmo") }
            );

            const msg = {
                "create_credit_account": "default"
            };

            const fee: StdFee = {
                amount: [{ denom: 'uosmo', amount: '35000' }],
                gas: '300000'
            };

            const result = await client.execute(
                address,
                contracts.contracts.creditManager,
                msg,
                fee
            );
            console.log(result, 'result')
            toast.success('Successfully minted account!')

            // Fetch the credit accounts after minting
            const creditAccountsResult = await fetchCreditAccounts(address, rpcEndpoint);
            if (creditAccountsResult && creditAccountsResult.tokens) {
                handleUpdateCreditAccounts(creditAccountsResult.tokens, rpcEndpoint);
            }
        } catch (error) {
            toast.error('There was an error, please try again!')
            console.error('Failed to mint credit account', error);
        } finally {
            setIsMinting(false);
        }
    };


    return <div className="flex flex-col items-center space-y-4">
        <button
            onClick={mintCreditAccount}
            className={`flex items-center px-4 py-2 text-white uppercase tracking-wider font-extralight border border-white rounded-xl ${isMinting ? "bg-[#3c223d] animate-flash" : "bg-[#3c223d] hover:bg-[#523154]"
                }`}
        >
            {isMinting ? 'Minting...' : 'Mint Account'}
        </button>
        <Toaster />
    </div>
}

export default MintAccountBtn;