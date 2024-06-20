import React from 'react';
import { IoWalletOutline } from "react-icons/io5";

interface WalletAddressProps {
    address: string;
}

const WalletAddress: React.FC<WalletAddressProps> = ({ address }) => {

    const splitAddress = (address: string = '') => {
        if (!address) return '';
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    };

    return <>
        <div className="px-4 py-2 border border-gray-400 rounded-xl text-white">
            <div className='flex items-center space-x-3'>
                <span>
                    <IoWalletOutline />
                </span>
                <span>{splitAddress(address)}</span>
            </div>
        </div>

    </>
}

export default WalletAddress;