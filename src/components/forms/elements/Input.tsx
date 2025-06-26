import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export default function Input({ label, ...props }: InputProps) {
    return (
        <div>
            <p>{label}</p>
            <input
                className='border-blue-500'
                {...props}
            />
        </div>
    );
}
