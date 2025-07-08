'use client';

import React, { useState } from 'react';
import { Info } from 'lucide-react';

export default function InfoButton({
    info,
}: {
    info: string | React.JSX.Element;
}) {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div
            className='relative w-fit'
            onMouseEnter={() => {
                console.log('blur');
                setShowInfo(true);
            }}
            onMouseLeave={() => {
                console.log('blur');
                setShowInfo(false);
            }}
        >
            <Info
                className='stroke-white fill-violet-900'
                size={20}
            />
            {showInfo && (
                <div className='py-2 px-1 bg-white shadow-lg shadow-violet-900/60 rounded-lg absolute left-1/2 -translate-x-1/2 bottom-full mb-1 min-w-80 text-center text-lg font-medium border-2 border-violet-700'>
                    {typeof info === 'string' ? <p>{info}</p> : <>{info}</>}
                </div>
            )}
        </div>
    );
}
