'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser, UserButton } from '@stackframe/stack';
import { LayoutDashboard } from 'lucide-react';

export default function Header() {
    const user = useUser();
    const router = useRouter();

    return (
        <header className='flex justify-between py-2 px-6'>
            <div />
            <p>Futur logo</p>
            <div>
                {user && (
                    <UserButton
                        extraItems={[
                            {
                                text: 'Dashboard',
                                icon: <LayoutDashboard />,
                                onClick: () => router.push('/dashboard'),
                            },
                        ]}
                    />
                )}
                {!user && <Link href={'/connexion'}>Se connecter</Link>}
            </div>
        </header>
    );
}
