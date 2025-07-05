'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser, UserButton } from '@stackframe/stack';
import { LayoutDashboard } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
    const user = useUser();
    const router = useRouter();

    return (
        <header className='flex justify-between items-center py-2 px-6 bg-violet-600 mt-2 rounded-full shadow-xl shadow-violet-900/20'>
            <Link href='/dashboard'>
                <Logo color='white' />
            </Link>
            <div className='space-x-4 text-xl font-semibold text-white'>
                <Link href='/'>Accueil</Link>
                <Link href='/dashboard'>Dashboard</Link>
                {user && (
                    <span className='text-violet-700 '>
                        <UserButton
                            extraItems={[
                                {
                                    text: 'Dashboard',
                                    icon: <LayoutDashboard size={17} />,
                                    onClick: () => router.push('/dashboard'),
                                },
                            ]}
                        />
                    </span>
                )}
                {!user && <Link href={'/connexion'}>Se connecter</Link>}
            </div>
        </header>
    );
}
