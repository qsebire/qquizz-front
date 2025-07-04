import AddThemeForm from '@/components/forms/AddThemeForm';
import MainContainer from '@/components/MainContainer';
import Title from '@/components/texts/Title';

export default function NouveauQuestionType() {
    return (
        <MainContainer className='flex flex-col justify-center items-center gap-8'>
            <Title>Nouveau Thème de question</Title>
            <div className='w-full max-w-xl'>
                <AddThemeForm />
            </div>
        </MainContainer>
    );
}
