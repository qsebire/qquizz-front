import { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const buttonVariants = cva(
    'rounded-2xl font-semibold shadow-lg shadow-violet-900/40 cursor-pointer',
    {
        variants: {
            variant: {
                default:
                    'bg-white text-violet-700 hover:bg-violet-900 hover:text-white',
                violet: 'bg-violet-700 text-white hover:bg-violet-900 hover:text-white',
            },
            size: {
                lg: 'py-2 px-4 text-lg',
                xl: 'py-3 px-6 text-xl',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'xl',
        },
    }
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    label: string;
}

export default function Button({
    variant,
    size,
    label,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {label}
        </button>
    );
}
