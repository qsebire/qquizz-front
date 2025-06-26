import Link from 'next/link';

export default function Dashboard() {
    return (
        <div>
            <p>Hello </p>
            <Link href='/dashboard/nouveau-question-type'>
                Nouveau type de question
            </Link>
        </div>
    );
}
