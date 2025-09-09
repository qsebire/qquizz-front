import { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { LucideIcon } from 'lucide-react';

const tagVariants = cva(
    'w-fit font-semibold flex items-center gap-2 rounded-full',
    {
        variants: {
            variant: {
                default: 'bg-white border-white text-violet-700',
                violet: 'bg-violet-700 border-violet-700 text-white',
                dark: 'bg-violet-950 border-violet-950 text-white',
                green: 'bg-teal-400 border-teal-400 text-violet-700',
                outline: 'bg-transparent border-white text-white',
            },
            size: {
                sm: 'py-0.5 px-2 text-sm  border',
                md: 'py-1 px-3 text-base  border',
                lg: 'py-1.5 px-4 text-lg  border',
                xl: 'py-2 px-6 text-xl  border',
                '2xl': 'py-3 px-8 text-2xl font-bold  border-2',
                '3xl': 'py-4 px-10 text-3xl font-bold  border-2',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'xl',
        },
    }
);

interface TagProps extends VariantProps<typeof tagVariants> {
    label: string;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    className?: string;
}

export default function Tag({
    variant,
    size,
    label,
    icon: Icon,
    iconPosition = 'right',
    className,
    ...props
}: TagProps) {
    const iconSize = {
        sm: 16,
        md: 18,
        lg: 20,
        xl: 22,
        '2xl': 24,
        '3xl': 28,
    };

    return (
        <div
            className={cn(tagVariants({ variant, size }), className)}
            {...props}
        >
            {Icon && iconPosition === 'left' && (
                <Icon size={size ? iconSize[size] : 22} />
            )}
            {label}
            {Icon && iconPosition === 'right' && (
                <Icon size={size ? iconSize[size] : 22} />
            )}
        </div>
    );
}
