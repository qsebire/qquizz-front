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
                'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center text-white text-shadow-violet-900/40 text-shadow-lg',
                className
            )}
        >
            {children}
        </h1>
    );
}
