import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string };

export default function Button({ label, ...props }: ButtonProps) {
    return (
        <button
            className='bg-white py-3 px-6 text-xl rounded-2xl font-semibold shadow-lg shadow-violet-900/40 cursor-pointer hover:bg-violet-900 hover:text-white'
            {...props}
        >
            {label}
        </button>
    );
}
