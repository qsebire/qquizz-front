import { Check } from 'lucide-react';
import { cn } from '../../../../lib/cn';

export default function RadioButton({
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
                    'ring-1 ring-white aspect-square w-6 rounded-full flex items-center justify-center shrink-0',
                    className
                )}
            >
                {isChecked && (
                    <div className='ring-1 ring-white aspect-square rounded-full w-8/12 bg-white' />
                )}
            </div>
            {label && (
                <p className='font-medium text-xl text-white shrink-0'>
                    {label}
                </p>
            )}
        </div>
    );
}
