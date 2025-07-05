import { cn } from '../../lib/cn';

export default function Logo({
    color = 'violet',
}: {
    color?: 'white' | 'violet';
}) {
    return (
        <p className='font-black text-3xl'>
            <span className='text-pink-600 -right-3 -bottom-1 relative z-30'>
                Q
            </span>
            <span
                className={cn(
                    'relative z-20',
                    color === 'white' ? 'text-white' : 'text-violet-800'
                )}
            >
                QuiZ
            </span>
            <span className='text-pink-600 bottom-0.5 -left-0.5 relative'>
                Z
            </span>
        </p>
    );
}
