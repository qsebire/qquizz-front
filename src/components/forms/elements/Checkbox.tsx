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
            className='space-y-0.5 cursor-pointer'
            onClick={onClick}
        >
            {label && (
                <p className='font-semibold text-2xl text-white'>{label}</p>
            )}
            <div
                className={cn(
                    'ring-1 ring-white aspect-square min-w-4 rounded',
                    isChecked && 'bg-white',
                    className
                )}
            >
                {isChecked && <Check className='stroke-violet-700' />}
            </div>
        </div>
    );
}
