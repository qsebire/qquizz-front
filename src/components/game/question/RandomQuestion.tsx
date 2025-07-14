'use client';

import { useEffect, useState } from 'react';

import { URL_BACKEND } from '../../../../data/general';

import Title from '@/components/texts/Title';
import MainContainer from '@/components/MainContainer';
import Image from 'next/image';
import { getRandomElementInArr, shuffleArray } from '../../../../utils/hooks';
import Timer from '../elements/Timer';
import { AllowedAnswerMode, Question } from '../../../../types/question';

export default function RandomQuestion() {
    const [randomQuestion, setRandomQuestion] = useState<Question>();

    useEffect(() => {
        const fetchRandomQuestion = async () => {
            try {
                const resp = await fetch(`${URL_BACKEND}/question/random`);
                const json = await resp.json();

                if (!resp.ok) {
                    console.log(json?.error || 'Erreur serveur.');
                    return;
                }

                setRandomQuestion(json);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRandomQuestion();
    }, []);

    if (!randomQuestion) return;

    const {
        allowedAnswerModes,
        answers,
        difficulty,
        question,
        theme,
        type,
        answerDetail,
        emojis,
        mediaUrl,
        subTheme,
    } = randomQuestion;

    const randomAnswerMode: AllowedAnswerMode =
        getRandomElementInArr(allowedAnswerModes);

    const shuffleAnswers = shuffleArray(answers);

    return (
        <MainContainer className='flex flex-col gap-10 items-center justify-center py-6 relative overflow-visible'>
            <Timer duration={30} />
            {type === 'IMAGE' && mediaUrl && (
                <div className='relative size-full max-w-3/5 max-h-3/5'>
                    <Image
                        src={mediaUrl}
                        alt='Question Image'
                        fill
                        className='object-contain drop-shadow-2xl drop-shadow-violet-950/40'
                    />
                </div>
            )}
            <div className='space-y-4 h-fit'>
                <div className='space-y-8'>
                    <Title>{question}</Title>
                    {randomAnswerMode === 'MCQ' && (
                        <div className='flex gap-4 justify-between'>
                            {shuffleAnswers.map((answer) => {
                                return (
                                    <div
                                        className='w-full min-h-20 p-3 flex items-center justify-center bg-violet-950 border-4 border-violet-800 rounded-2xl text-2xl text-white text-center font-semibold leading-tight shadow-xl shadow-violet-950/40'
                                        key={answer.id}
                                    >
                                        {answer.text}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </MainContainer>
    );
}
