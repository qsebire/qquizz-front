import Header from '@/components/Header';
import AuthGuard from '@/components/users/AuthGuard';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard>
            <Header />
            {children}
        </AuthGuard>
    );
}
