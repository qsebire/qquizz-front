import Header from '@/components/Header';
import AuthGuard from '@/components/users/AuthGuard';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='h-full flex flex-col gap-2 px-4 md:px-6 xl:px-10 pb-4 md:pb-6 xl:pb-10'>
            <Header />
            <AuthGuard>{children}</AuthGuard>
        </div>
    );
}
