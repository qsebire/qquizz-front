import AddQuestionForm from '@/components/forms/AddQuestionForm';
import MainContainer from '@/components/MainContainer';
import Title from '@/components/texts/Title';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NouveauQuestionType() {
    return (
        <MainContainer className='flex flex-col items-center gap-8 relative'>
            <Link
                href='/dashboard'
                className='flex items-center bg-violet-950 text-white text-lg font-semibold gap-1 rounded-full py-1 pl-2 pr-3 shadow-lg shadow-violet-900/40 absolute top-4 left-4'
            >
                <ArrowLeft /> Retour au dashboard
            </Link>
            <Title className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
                Nouvelle question
            </Title>
            <div className='w-full max-w-xl'>
                <AddQuestionForm />
            </div>
        </MainContainer>
    );
}
