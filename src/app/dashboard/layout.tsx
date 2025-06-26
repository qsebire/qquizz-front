'use client';

import Header from '@/components/Header';
import { useUser } from '@stackframe/stack';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = useUser();

    if (!user) redirect('/connexion');

    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
