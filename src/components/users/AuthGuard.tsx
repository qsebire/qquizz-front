'use client';

import { useUser } from '@stackframe/stack';
import { redirect } from 'next/navigation';

export default function AuthGuard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = useUser();

    if (!user) redirect('/connexion');

    return <>{children}</>;
}
