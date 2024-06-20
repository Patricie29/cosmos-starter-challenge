import React, { useState } from 'react';
import { fundCreditAccount } from '../fundCreditAccount';
import { fetchCreditAccountPositions } from '../fetchCreditAccountPositions';
import { ExtendedHttpEndpoint } from '@cosmos-kit/core';

interface CreditAccountManagerProps {
    accounts: string[];
    rpc: string | ExtendedHttpEndpoint;
    address: string;
}

interface AccountPosition {
    deposits: { denom: string, amount: string }[];
    debts: any[];
    lends: any[];
    vaults: any[];
}

const CreditAccountManager: React.FC<CreditAccountManagerProps> = ({ accounts, rpc, address }) => {
    const [accountPositions, setAccountPositions] = useState<{ [key: string]: AccountPosition }>({});
    const [fundingAccount, setFundingAccount] = useState<string | null>(null);

    const handleFundAccount = async (accountId: string) => {
        setFundingAccount(accountId);
        try {
            await fundCreditAccount(accountId, rpc, address);
        } finally {
            setFundingAccount(null);
        }
    };

    const handleFetchPositions = async (accountId: string) => {
        const positions = await fetchCreditAccountPositions(rpc, accountId);
        setAccountPositions(prevPositions => ({
            ...prevPositions,
            [accountId]: positions
        }));
    };

    return (
        <div className='mt-4'>
            <h3 className='text-center mb-1'>Credit Accounts</h3>
            <ul className='flex flex-row gap-4 flex-wrap text-center justify-center'>
                {accounts.map((accountId, index) => (
                    <li key={index} className="mb-2 p-5 border space-x-4 border-gray-400 rounded-xl text-center">
                        <p className='font-medium'>Credit Account ID: <span className='font-extralight italic'>- {accountId} -</span></p>

                        <button
                            onClick={() => handleFundAccount(accountId)}
                            className={`px-4 py-2 mt-2 text-sm text-white tracking-wider font-extralight border border-white rounded-xl ${fundingAccount === accountId ? "bg-[#3c223d] animate-flash" : "bg-[#3c223d] hover:bg-[#523154]"}`}
                        >
                            {fundingAccount === accountId ? 'Funding...' : 'Fund Account'}
                        </button>
                        <button onClick={() => handleFetchPositions(accountId)} className="px-4 py-2 mt-2 text-sm text-white tracking-wider font-extralight border border-white rounded-xl bg-[#3c223d] hover:bg-[#523154]"
                        >
                            Account Positions
                        </button>

                        {/* Conditionally Display Account Positions or No Positions Message */}
                        {/* I would use similar approach to display other positions as well, but since I only have available deposits I decided to just keep it with deposits only */}
                        {accountPositions[accountId] && accountPositions[accountId].deposits.length > 0 && (
                            <div className="mt-4">
                                <strong>Deposits: </strong>
                                {accountPositions[accountId].deposits.length > 0 ?
                                    accountPositions[accountId].deposits.map((deposit, idx) => (
                                        `${deposit.denom} - ${deposit.amount}${idx < accountPositions[accountId].deposits.length - 1 ? ', ' : ''}`
                                    )) : <p className="mt-4">No positions available</p>}
                            </div>
                        )}

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreditAccountManager;

