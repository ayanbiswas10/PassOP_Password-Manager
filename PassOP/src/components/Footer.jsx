import React from 'react'

const Footer = () => {
    return (
        <div className='bottom-0 flex flex-col items-center justify-center w-full text-white bg-slate-800'>
            <div className='text-2xl font-bold text-white logo'>
                <span className='text-green-600'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-600'>OP/&gt;</span>
            </div>
            <div className='flex items-center justify-center'>Created by Ayan Biswas
            </div>
        </div>
    )
}

export default Footer
