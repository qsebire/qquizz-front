import { StackProvider, StackTheme } from '@stackframe/stack';
import AuthGuard from '@/components/users/AuthGuard';
import { stackServerApp } from '@/stack';

const authStackTheme = {
    light: {
        foreground: 'white',
        popover: 'white',
        popoverForeground: '#7f22fe',
        primary: '#7f22fe',
        primaryForeground: 'white',
        secondary: '#4d179a',
        secondaryForeground: 'white',
        muted: 'white',
        mutedForeground: 'white',
        border: 'white',
        input: '#7f22fe',
        ring: '#7f22fe',
    },
    radius: '16px',
};

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
            <StackTheme theme={authStackTheme}>{children}</StackTheme>
        </StackProvider>
    );
}
