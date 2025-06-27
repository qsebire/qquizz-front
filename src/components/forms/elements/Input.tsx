import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export default function Input({ label, ...props }: InputProps) {
    return (
        <div className='space-y-0.5'>
            <p className='font-medium text-xl'>{label}</p>
            <input
                className='ring-1 ring-violet-500 focus-visible:ring-2  focus-visible:outline-0 w-full rounded-lg py-1 px-2 text-xl'
                {...props}
            />
        </div>
    );
}
