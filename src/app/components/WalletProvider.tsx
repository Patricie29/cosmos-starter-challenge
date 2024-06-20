'use client'

import * as React from 'react';

import { ChainProvider } from '@cosmos-kit/react';
import { chains as defaultChains, assets } from 'chain-registry';
import { wallets } from 'cosmos-kit';

import "@interchain-ui/react/styles";

interface ProvidersProps {
    children: React.ReactNode
}

const WalletProvider: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <ChainProvider
            chains={defaultChains}
            assetLists={assets}
            wallets={wallets}
            signerOptions={{}}
            endpointOptions={{
                endpoints: {
                    osmosis: {
                        rpc: ['https://rpc-osmosis.blockapsis.com'],
                        rest: ['https://lcd-osmosis.blockapsis.com']
                    }
                }
            }}
        >
            {children}

        </ChainProvider >
    );
}

export default WalletProvider