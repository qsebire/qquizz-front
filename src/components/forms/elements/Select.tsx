import { SelectHTMLAttributes } from 'react';
import { cn } from '../../../../lib/cn';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string | number; label: string; id?: string | number }[];
    label: string;
};

export default function Select({
    options,
    label,
    className,
    ...props
}: SelectProps) {
    const optionsElements = options.map((option, id) => {
        return (
            <option
                key={option.id || id}
                value={option.value}
            >
                {option.label}
            </option>
        );
    });

    return (
        <div className='space-y-0.5 w-full'>
            <p className='font-semibold text-2xl text-white'>{label}</p>
            <select
                className={cn(
                    'ring-1 ring-white text-white focus-visible:bg-violet-500 focus-visible:outline-0 focus-visible:shadow-xl shadow-violet-900/40 w-full rounded-lg py-2 px-3 text-xl',
                    className
                )}
                autoComplete='on'
                {...props}
            >
                {optionsElements}
            </select>
        </div>
    );
}
