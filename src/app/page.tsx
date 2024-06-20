'use client'

import ConnectWalletBtn from "./components/ConnectWalletBtn";
import { useChain } from "@cosmos-kit/react";
import WalletStatus from "./components/WalletAddress";
import { useState } from "react";
import { Toaster } from "@interchain-ui/react";
import CreditAccountManager from "./components/CreditAccountManager";
import MintAccountBtn from "./components/MintAccountBtn";
import { ExtendedHttpEndpoint } from "@cosmos-kit/core";

export default function Home() {
  const chainContext = useChain('osmosis');
  const { status, address, connect, disconnect, isWalletConnecting } = chainContext;
  const [creditAccounts, setCreditAccounts] = useState<string[]>([]);
  const [rpcEndpoint, setRpcEndpoint] = useState<string | string | ExtendedHttpEndpoint>('');


  const handleUpdateCreditAccounts = (accounts: string[], rpc: string | ExtendedHttpEndpoint) => {
    setCreditAccounts(accounts);
    setRpcEndpoint(rpc);
  }

  return (
    <main className="flex min-h-screen flex-wrap content-start justify-center gap-10 p-24">
      <Toaster />

      <h1 className="w-full text-center text-4xl">Cosmos Starter Challenge</h1>
      <p className="text-white/70 text-lg w-full text-center">
        Welcome to the Cosmos Starter Challenge!
      </p>

      <section className='absolute top-0 right-0 p-4'>
        <div className='flex items-center space-x-6'>
          <ConnectWalletBtn
            status={status}
            connect={connect}
            disconnect={disconnect}
            isWalletConnecting={isWalletConnecting}
          />
          {status === 'Connected' && address && (
            <WalletStatus address={address} />
          )}
        </div>
      </section>

      {status === 'Connected' && address && (

        <section>
          <MintAccountBtn address={address} handleUpdateCreditAccounts={handleUpdateCreditAccounts} />

          {creditAccounts.length > 0 && (
            <CreditAccountManager accounts={creditAccounts} rpc={rpcEndpoint} address={address} />
          )}
        </section>

      )}
    </main>
  );
}
