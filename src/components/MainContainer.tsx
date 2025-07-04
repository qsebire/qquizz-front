import { cn } from '../../lib/cn';

export default function MainContainer({
    children,
    className,
}: Readonly<{
    children: React.ReactNode;
}> & { className?: string }) {
    return (
        <div
            className={cn(
                'w-full h-full bg-violet-600 py-8 px-10 rounded-3xl border-10 border-white p-12 shadow-2xl shadow-violet-900/40 overflow-y-scroll',
                className
            )}
        >
            {children}
        </div>
    );
}
