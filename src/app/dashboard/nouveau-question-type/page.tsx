import Card from '@/components/card';
import NewQuestionTypeForm from '@/components/forms/NewQuestionTypeForm';
import Title from '@/components/texts/title';

export default function NouveauQuestionType() {
    return (
        <div className='space-y-6'>
            <Title>Nouveau type de question</Title>
            <Card className='max-w-4xl mx-auto'>
                <NewQuestionTypeForm />
            </Card>
        </div>
    );
}
