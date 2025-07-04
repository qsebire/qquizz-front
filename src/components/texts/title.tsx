export default function Title({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center text-white text-shadow-violet-900/40 text-shadow-lg'>
            {children}
        </h1>
    );
}
