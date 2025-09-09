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
                'text-7xl font-bold text-center text-white text-shadow-violet-900/40 text-shadow-lg',
                className
            )}
        >
            {children}
        </h1>
    );
}

//text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl 2xl:
