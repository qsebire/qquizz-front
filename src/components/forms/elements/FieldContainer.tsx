import { ArrowUp } from 'lucide-react';

export type FieldContainerProps = {
    label?: string;
    isOptional?: boolean;
    description?: string;
    errorMessage?: string;
};

export default function FieldContainer({
    children,
    label,
    description,
    errorMessage,
    isOptional = false,
}: {
    children: React.ReactNode;
} & FieldContainerProps) {
    return (
        <div className='w-full space-y-1'>
            <div className='space-y-1'>
                <div>
                    {label && (
                        <p className='font-semibold text-2xl text-white'>
                            {label}
                            {isOptional && (
                                <span className='italic text-lg font-medium'>
                                    {'  '}(Optionnel)
                                </span>
                            )}
                        </p>
                    )}
                    {description && (
                        <p className='text-lg text-white leading-tight'>
                            {description}
                        </p>
                    )}
                </div>
                {children}
            </div>
            {errorMessage && (
                <p className='text-lg bg-pink-600 text-white font-medium w-fit py-1 px-2 rounded-lg leading-tight'>
                    {errorMessage || 'Ce champ est obligatoire'}
                </p>
            )}
        </div>
    );
}
