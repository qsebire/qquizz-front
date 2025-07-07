import { InputHTMLAttributes } from 'react';
import { cn } from '../../../../lib/cn';

type InputProps = InputHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    className?: string;
};

export default function Textarea({ label, className, ...props }: InputProps) {
    return (
        <div className='space-y-0.5 w-full'>
            {label && (
                <p className='font-semibold text-2xl text-white'>{label}</p>
            )}
            <textarea
                className={cn(
                    'ring-1 ring-white text-white focus-visible:bg-violet-500 focus-visible:outline-0 focus-visible:shadow-xl shadow-violet-900/40 w-full rounded-lg py-2 px-3 text-xl',
                    className
                )}
                {...props}
            />
        </div>
    );
}
