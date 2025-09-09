import { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { LucideIcon } from 'lucide-react';

const buttonVariants = cva(
    ' font-semibold cursor-pointer flex items-center gap-2',
    {
        variants: {
            variant: {
                default:
                    'bg-white text-violet-700 hover:bg-violet-900 hover:text-white',
                violet: 'bg-violet-700 text-white hover:bg-violet-900 hover:text-white',
                green: 'bg-teal-400 text-teal-900 hover:bg-teal-800 hover:text-teal-200',
                dark: 'bg-violet-950 text-white hover:bg-violet-800 hover:text-white',
                outline:
                    'bg-transparent border border-white text-white hover:bg-white hover:text-violet-700',
            },
            size: {
                sm: 'py-1 px-2 text-sm rounded-md',
                md: 'py-1.5 px-3 text-base rounded-lg',
                lg: 'py-2 px-4 text-lg rounded-xl',
                xl: 'py-3 px-6 text-xl rounded-2xl',
                '2xl': 'py-4 px-8 text-2xl font-bold rounded-2xl',
                '3xl': 'py-5 px-10 text-3xl font-bold rounded-3xl',
            },
            isClickable: {
                true: 'pointer-events-auto shadow-lg shadow-violet-900/40',
                false: 'pointer-events-none opacity-60',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'xl',
            isClickable: true,
        },
    }
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    label: string;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
}

export default function Button({
    variant,
    size,
    isClickable,
    label,
    icon: Icon,
    iconPosition = 'right',
    className,
    ...props
}: ButtonProps) {
    const iconSize = {
        sm: 16,
        md: 18,
        lg: 20,
        xl: 22,
        '2xl': 24,
        '3xl': 28,
    };

    return (
        <button
            className={cn(
                buttonVariants({ variant, size, isClickable }),
                className
            )}
            {...props}
        >
            {Icon && iconPosition === 'left' && (
                <Icon size={size ? iconSize[size] : 22} />
            )}
            {label}
            {Icon && iconPosition === 'right' && (
                <Icon size={size ? iconSize[size] : 22} />
            )}
        </button>
    );
}
