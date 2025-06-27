import { Check } from 'lucide-react';
import { cn } from '../../../../lib/cn';
import { MouseEventHandler } from 'react';

type CheckboxButtonProps = {
    label: string;
    checked: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
};

export default function CheckboxButton({
    label,
    checked,
    onClick,
}: CheckboxButtonProps) {
    return (
        <div
            className={cn(
                'flex items-center gap-2 text-lg py-1 px-2 rounded-lg border border-violet-500 cursor-pointer',
                checked
                    ? 'bg-violet-500 text-violet-50'
                    : 'bg-violet-50 text-violet-500'
            )}
            onClick={onClick}
        >
            {label}
            {checked && <Check className='w-5' />}
        </div>
    );
}
