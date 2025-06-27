export default function Title({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-center '>
            {children}
        </h1>
    );
}
