import { cn } from '../../../lib/cn';

export default function Title({
    children,
    className,
}: Readonly<{
    children: React.ReactNode;
}> & { className?: string }) {
    return (
        <h1
            className={cn(
                'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-white text-shadow-violet-900/40 text-shadow-lg',
                className
            )}
        >
            {children}
        </h1>
    );
}
