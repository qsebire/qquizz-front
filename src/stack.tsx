import 'server-only';

import { StackServerApp } from '@stackframe/stack';

export const stackServerApp = new StackServerApp({
    tokenStore: 'nextjs-cookie',
    urls: {
        signIn: '/connexion',
        signUp: '/inscription',
        afterSignIn: '/dashboard',
        afterSignUp: '/dashboard',
        accountSettings: '/dashboard/profil',
    },
});
