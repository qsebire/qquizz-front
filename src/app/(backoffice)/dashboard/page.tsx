import Title from '@/components/texts/Title';
import ThemesGrid from '@/components/ThemesGrid';
import Link from 'next/link';

export default function Dashboard() {
    return (
        <div className='py-8 space-y-8'>
            <h1 className='text-6xl font-bold'>Dashboard</h1>
            <div className='py-8 border-y space-y-4'>
                <h2 className='text-5xl font-bold'>Thèmes</h2>
                <ThemesGrid addThemeButton={true} />
            </div>
        </div>
    );
}
