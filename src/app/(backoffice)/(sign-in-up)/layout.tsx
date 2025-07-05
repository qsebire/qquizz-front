import GuestGuard from '@/components/users/GuestGuard';

export default function SignInUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <GuestGuard>{children}</GuestGuard>;
}
