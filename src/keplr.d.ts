interface Window {
    keplr: {
        enable: (chainId: string) => Promise<void>;
        getOfflineSigner: (chainId: string) => OfflineSigner;
        experimentalSuggestChain: (chainInfo: any) => Promise<void>;
    };
}