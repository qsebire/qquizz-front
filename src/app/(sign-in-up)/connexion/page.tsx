import { SignIn } from '@stackframe/stack';

export default function Connexion() {
    return (
        <SignIn
            fullPage={true}
            automaticRedirect={false}
        />
    );
}
