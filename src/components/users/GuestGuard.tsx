'use client';

import { useUser } from '@stackframe/stack';
import { redirect } from 'next/navigation';

export default function GuestGuard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = useUser();

    if (user) redirect('/dashboard');

    return <>{children}</>;
}
