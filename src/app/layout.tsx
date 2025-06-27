import type { Metadata } from 'next';
import { StackProvider, StackTheme } from '@stackframe/stack';
import { stackServerApp } from '../stack';
import { Kanit } from 'next/font/google';
import './globals.css';

const kanit = Kanit({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'QQuizz',
    description: 'QQuizz - Jeu de QQuizz entre amis',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${kanit.className} antialiased bg-violet-300 text-violet-800 px-4 md:px-6 xl:px-10`}
            >
                <StackProvider
                    app={stackServerApp}
                    lang='fr-FR'
                >
                    <StackTheme>{children}</StackTheme>
                </StackProvider>
            </body>
        </html>
    );
}
