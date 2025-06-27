import { cn } from '../../lib/cn';

export default function Card({
    children,
    className,
}: Readonly<{
    children: React.ReactNode;
}> & { className?: string }) {
    return (
        <div className={cn('bg-violet-100 py-8 px-10 rounded-2xl', className)}>
            {children}
        </div>
    );
}
