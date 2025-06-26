'use client';

import { SignUp } from '@stackframe/stack';

export default function Connexion() {
    return (
        <SignUp
            fullPage={true}
            automaticRedirect={false}
            extraInfo={
                <p>
                    By signing up, you agree to our <a href='/terms'>Terms</a>
                </p>
            }
        />
    );
}
