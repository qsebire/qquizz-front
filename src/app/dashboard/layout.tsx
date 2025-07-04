import { StackProvider, StackTheme } from '@stackframe/stack';
import AuthGuard from '@/components/users/AuthGuard';
import Header from '@/components/Header';
import { stackServerApp } from '@/stack';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StackProvider
            app={stackServerApp}
            lang='fr-FR'
        >
            <StackTheme>
                {' '}
                <AuthGuard>
                    <div className='h-full flex flex-col gap-2 px-4 md:px-6 xl:px-10 pb-4 md:pb-6 xl:pb-10'>
                        <Header />
                        {children}
                    </div>
                </AuthGuard>
            </StackTheme>
        </StackProvider>
    );
}
