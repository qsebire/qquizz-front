import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import './globals.css';

const source_Sans_3 = Source_Sans_3({
    subsets: ['latin'],
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
        <html
            lang='en'
            className='h-full'
        >
            <body
                className={`${source_Sans_3.className} h-full min-h-screen antialiased bg-violet-300 text-violet-800`}
            >
                {children}
            </body>
        </html>
    );
}
