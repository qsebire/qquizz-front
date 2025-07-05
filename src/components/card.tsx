import { cn } from '../../lib/cn';

export default function Card({
    children,
    className,
}: Readonly<{
    children: React.ReactNode;
}> & { className?: string }) {
    return (
        <div
            className={cn(
                'py-8 px-6 flex flex-col items-center justify-center gap-2 text-center bg-white shadow-xl shadow-violet-900/20 rounded-2xl',
                className
            )}
        >
            {children}
        </div>
    );
}
