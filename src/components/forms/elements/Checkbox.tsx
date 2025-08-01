import { Check } from 'lucide-react';
import { cn } from '../../../../lib/cn';

export default function Checkbox({
    label,
    className,
    isChecked = false,
    onClick,
}: {
    label?: string;
    className?: string;
    isChecked?: boolean;
    onClick: () => void;
}) {
    return (
        <div
            className='space-y-0.5 cursor-pointer flex items-center gap-2'
            onClick={onClick}
        >
            <div
                className={cn(
                    'ring-1 ring-white aspect-square w-6 flex items-center justify-center rounded shrink-0',
                    isChecked && 'bg-white',
                    className
                )}
            >
                {isChecked && <Check className='stroke-violet-700' />}
            </div>
            {label && (
                <p className='font-medium text-xl text-white shrink-0'>
                    {label}
                </p>
            )}
        </div>
    );
}
