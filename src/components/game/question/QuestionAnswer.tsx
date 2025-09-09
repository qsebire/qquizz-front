'use client';

import Title from '@/components/texts/Title';
import MainContainer from '@/components/MainContainer';
import Image from 'next/image';
import { shuffleArray } from '../../../../utils/hooks';
import Timer from '../elements/Timer';
import { useGameStore } from '../../../../stores';
import Button from '@/components/Button';
import { useEffect } from 'react';
import Tag from '@/components/Tag';

export default function QuestionAnswer() {
    const { round, updateQuestionStep, gameRules } = useGameStore();
    const { questions, currentQuestion } = round;
    const { timePerQuestion, questionPerRound } = gameRules;
    const isThemeSelectionQuestion = currentQuestion === 0;

    const {
        answerMode,
        answerDetail,
        questionGameMode,
        answers,
        question,
        type,
        emojis,
        mediaUrl,
    } = questions[currentQuestion];

    const correctAnswer = answers.find((answer) => answer.isCorrect)?.text;

    useEffect(() => {
        if (!isThemeSelectionQuestion) {
            const goToWaitingAnswer = setTimeout(
                () => updateQuestionStep('waitingAnswer'),
                timePerQuestion
            );

            return () => {
                clearTimeout(goToWaitingAnswer);
            };
        }
    }, [isThemeSelectionQuestion, timePerQuestion]);

    return (
        <MainContainer className='grid grid-cols-3 items-center p-6 relative overflow-visible'>
            <Tag
                label={
                    isThemeSelectionQuestion
                        ? 'Qui choisi le thème ?'
                        : `Question ${currentQuestion}/${questionPerRound}`
                }
                size='xl'
                className='absolute -top-7 left-1/2 -translate-x-1/2'
            />
            <div className='space-y-4 col-span-2 p-8'>
                <p className='text-4xl font-bold text-teal-300'>Réponse</p>
                <Title className='text-left text-8xl'>{correctAnswer}</Title>
                {answerDetail && <p>{answerDetail}</p>}
            </div>
            <div className='col-span-1 border-3 border-white rounded-2xl h-full text-white text-center'>
                <p>Sélectionnez l'équipe qui commence</p>
            </div>
        </MainContainer>
    );
}
