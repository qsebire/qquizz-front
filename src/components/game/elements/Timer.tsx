'use client';

import { useEffect, useState } from 'react';
import { cn } from '../../../../lib/cn';

export default function Timer({
    duration,
    className,
}: {
    duration: number;
    className?: string;
}) {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        if (time <= 0) {
            return;
        }

        const timerId = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [time]);

    return (
        <div
            className={cn(
                'aspect-square w-20 rounded-full border-5 border-white flex justify-center items-center relative shadow-2xl shadow-violet-900 overflow-hidden',
                time > 10 ? 'bg-teal-400' : 'bg-pink-500',
                className
            )}
        >
            <div
                className='absolute top-0 left-0 w-full z-20 overflow-hidden shadow-innertail reduce-height'
                style={{ animationDuration: duration + 's' }}
            >
                <div
                    className={cn(
                        'aspect-square w-18 rounded-full ',
                        time > 10 ? 'bg-teal-900' : 'bg-pink-900'
                    )}
                />
            </div>
            <p className='text-4xl font-black text-white relative z-30'>
                {time}
            </p>
        </div>
    );
}
