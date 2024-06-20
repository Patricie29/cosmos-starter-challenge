'use client'

import React from 'react';
import { IoWalletOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";


interface ConnectWalletBtnProps {
    status: string;
    connect: () => void;
    disconnect: () => void;
    isWalletConnecting: boolean;
}

const ConnectWalletBtn: React.FC<ConnectWalletBtnProps> = ({ status, connect, disconnect, isWalletConnecting }) => {

    return <>
        {
            status !== 'Connected' ? (

                // if I would have more time I would make these buttons reusable to avoid code and classes duplication
                <button onClick={() => connect()} className="flex items-center px-4 py-2 text-white uppercase tracking-wider font-extralight border border-white rounded-xl bg-[#3c223d] hover:bg-[#523154]">
                    <span className='mr-2'>
                        <IoWalletOutline />
                    </span>
                    {isWalletConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
            ) : (
                <div>
                    <div className='flex text-[20px] transition-transform transform hover:scale-125 duration-300'>
                        <button onClick={() => disconnect()}
                            className='flex text-[20px]'>
                            <FaPowerOff />
                        </button>
                    </div>
                </div>
            )
        }
    </>
}

export default ConnectWalletBtn;