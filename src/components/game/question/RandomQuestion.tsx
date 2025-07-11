'use client';

import { useEffect, useState } from 'react';

import { URL_BACKEND } from '../../../../data/general';
import Button from '@/components/Button';
import {
    allowedAnswerModeType,
    questionType,
} from '../../../../data/dataTypes';
import Title from '@/components/texts/Title';
import MainContainer from '@/components/MainContainer';
import Image from 'next/image';
import { getRandomElementInArr, shuffleArray } from '../../../../utils/hooks';

export default function RandomQuestion() {
    const [randomQuestion, setRandomQuestion] = useState<questionType>();

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
        subtheme,
    } = randomQuestion;

    const randomAnswerMode: allowedAnswerModeType =
        getRandomElementInArr(allowedAnswerModes);

    const shuffleAnswers = shuffleArray(answers);

    return (
        <MainContainer className='flex flex-col gap-4 items-center justify-center pt-8 pb-12'>
            {type === 'IMAGE' && mediaUrl && (
                <div className='relative h-full w-full'>
                    <Image
                        src={mediaUrl}
                        alt='Question Image'
                        fill
                        className='h-full object-contain'
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
                                        className='w-full min-h-20 p-3 flex items-center justify-center bg-white border-4 border-violet-900 rounded-2xl text-2xl text-violet-900 text-center font-semibold leading-tight'
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
