'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '@stackframe/stack';
import { v4 as uuidv4 } from 'uuid';

import Button from '../Button';
import Input from './elements/Input';
import Select from './elements/Select';
import Textarea from './elements/Textarea';
import UploadImage from './elements/UploadImage';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import AnswersForm from './AnswersForm';

import {
    allowedAnswerModeType,
    formDataQuestionType,
    ThemeProps,
} from '../../../data/dataTypes';
import {
    allowedAnswerModes,
    difficulties,
    questionTypes,
} from '../../../data/shared/quizzModes';
import { URL_BACKEND } from '../../../data/general';
import { cn } from '../../../lib/cn';
import Checkbox from './elements/Checkbox';
import { Info } from 'lucide-react';
import InfoButton from '../InfoButton';

export default function AddQuestionForm() {
    const user = useUser();

    const [error, setError] = useState({ isError: false, message: '' });
    const [isValidate, setIsValidate] = useState(false);
    const [showSmileyPicker, setShowSmileyPicker] = useState(false);
    const [themes, setThemes] = useState<ThemeProps[]>();
    const [formData, setFormData] = useState<formDataQuestionType>({
        question: '',
        type: 'TEXT',
        themeId: 0,
        difficulty: 1,
        mediaUrl: '',
        emojis: '',
        allowedAnswerMode: ['CASH', 'MCQ', 'EITHER_ONE'],
        answers: [
            { id: uuidv4(), text: '', isCorrect: true },
            { id: uuidv4(), text: '', isCorrect: false },
        ],
        answerDetail: '',
        userId: user?.id,
    });

    const emojiInputRef = useRef<HTMLInputElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const resp = await fetch(`${URL_BACKEND}/theme/all`);
                const json = await resp.json();
                if (!resp.ok) {
                    setError({
                        isError: true,
                        message: json?.error || 'Erreur serveur.',
                    });
                    setIsValidate(false);
                    return;
                }
                setThemes(json);
                setFormData({
                    ...formData,
                    themeId: json[0].id,
                });
            } catch (error) {
                setError({
                    isError: true,
                    message: 'Erreur lors de la requête.',
                });
                setIsValidate(false);
            }
        };

        fetchThemes();
    }, []);

    const isMediaQuestion = ['VIDEO', 'AUDIO'].includes(formData.type);
    const mediaLabels = {
        VIDEO: 'URL de la vidéo',
        AUDIO: "URL de l'audio",
    };

    // Manage answers
    const canAddAnswer = formData.answers.length < 4;
    const canDeletAnswer = formData.answers.length > 1;

    const handleAddAnswer = () => {
        if (canAddAnswer) {
            setFormData({
                ...formData,
                answers: [
                    ...formData.answers,
                    { id: uuidv4(), text: '', isCorrect: false },
                ],
            });
        }
    };

    const handleDeleteAnswer = (id: string) => {
        if (canDeletAnswer) {
            setFormData({
                ...formData,
                answers: formData.answers.filter((answer) => id !== answer.id),
            });
        }
    };

    const handleAnswerChange = (
        text: string,
        isCorrect: boolean,
        id: string
    ) => {
        setFormData(() => {
            const newAnswers = formData.answers.map((answer) => {
                if (id === answer.id) return { ...answer, text, isCorrect };
                return isCorrect ? { ...answer, isCorrect: false } : answer;
            });

            return { ...formData, answers: newAnswers };
        });
    };

    // Emojies
    const handleEmojiesBlur = () => {
        setTimeout(() => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(document.activeElement)
            ) {
                setShowSmileyPicker(false);
            }
        }, 100);
    };

    const handleAnswerMode = (name: allowedAnswerModeType) => {
        const isInclude = formData.allowedAnswerMode.includes(name);

        if (isInclude) {
            if (formData.allowedAnswerMode.length > 1) {
                setFormData((prev) => {
                    const answers = [...prev.answers];
                    const filteredModes = prev.allowedAnswerMode.filter(
                        (answerMode) => answerMode !== name
                    );

                    if (
                        filteredModes.length === 1 &&
                        filteredModes.includes('CASH') &&
                        answers.length > 1
                    ) {
                        return {
                            ...prev,
                            allowedAnswerMode: filteredModes,
                            answers: answers.slice(0, 1),
                        };
                    }

                    return {
                        ...prev,
                        allowedAnswerMode: filteredModes,
                    };
                });
                return;
            }
            alert('Au moins un mode de réponse doit être sélectionné');
        }

        if (name === 'TRUE_FALSE') {
            setFormData((prev) => {
                return {
                    ...prev,
                    allowedAnswerMode: ['TRUE_FALSE'],
                    answers: [
                        { id: uuidv4(), text: 'Vrai', isCorrect: true },
                        { id: uuidv4(), text: 'Faux', isCorrect: false },
                    ],
                };
            });
            alert(
                'Le mode Vrai ou Faux ne peut pas être sélectionnée avec un autre mode.'
            );
            return;
        }

        setFormData((prev) => {
            const answerModesWithoutTrueFalse = prev.allowedAnswerMode.filter(
                (answerMode) => answerMode !== 'TRUE_FALSE'
            );

            const newModes = [...answerModesWithoutTrueFalse, name];
            const answers = [...prev.answers];

            if (
                newModes.length === 1 &&
                newModes.includes('CASH') &&
                answers.length > 1
            ) {
                return {
                    ...prev,
                    allowedAnswerMode: [...answerModesWithoutTrueFalse, name],
                    answers: answers.slice(0, 1),
                };
            }

            return {
                ...prev,
                allowedAnswerMode: [...answerModesWithoutTrueFalse, name],
                answers:
                    answers.length === 1
                        ? [
                              ...answers,
                              { id: uuidv4(), text: '', isCorrect: true },
                          ]
                        : answers,
            };
        });
    };

    const answerModes = allowedAnswerModes.map((allowedAnswerMode) => {
        return (
            <div className='flex items-start gap-1'>
                <Checkbox
                    label={allowedAnswerMode.label}
                    isChecked={formData.allowedAnswerMode.includes(
                        allowedAnswerMode.name
                    )}
                    onClick={() => handleAnswerMode(allowedAnswerMode.name)}
                />
                <InfoButton info={allowedAnswerMode.description} />
            </div>
        );
    });

    return (
        <form
            className='space-y-4 flex flex-col items-center gap-4'
            // onSubmit={handleSubmit}
        >
            <div className='w-full space-y-4'>
                <Input
                    label='Question'
                    name='question'
                    value={formData.question}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            question: e.currentTarget.value,
                        })
                    }
                    placeholder='Ex : Histoire'
                />
                <Select
                    label='Type de question'
                    options={questionTypes}
                    value={formData.type}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            type: e.currentTarget.value,
                            mediaUrl: '',
                            emojis: '',
                        })
                    }
                />
                {themes && (
                    <Select
                        label='Thème de la question'
                        options={themes.map((theme) => {
                            return {
                                value: theme.id,
                                label: `${theme.smiley} ${theme.name}`,
                                id: theme.id,
                            };
                        })}
                        value={formData.themeId}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                themeId: Number(e.currentTarget.value),
                            })
                        }
                    />
                )}
                <div className='space-y-2'>
                    <p className='font-semibold text-2xl text-white'>
                        Mode(s) de réponse
                    </p>
                    <div className='flex items-center gap-4 flex-wrap'>
                        {answerModes}
                    </div>
                </div>
                {formData.type === 'IMAGE' && (
                    <UploadImage
                        label='Image'
                        imageUpload={formData.mediaUrl}
                        onUpload={(imageUrl) =>
                            setFormData({
                                ...formData,
                                mediaUrl: imageUrl,
                            })
                        }
                    />
                )}
                {isMediaQuestion && (
                    <Input
                        label={
                            mediaLabels[
                                (formData.type as 'VIDEO' | 'AUDIO') ??
                                    'URL du média'
                            ]
                        }
                        name='mediaUrl'
                        value={formData.mediaUrl}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                mediaUrl: e.currentTarget.value,
                            })
                        }
                    />
                )}
                {formData.type === 'EMOJI' && (
                    <div className='relative'>
                        <Input
                            ref={emojiInputRef}
                            label='Émojies à deviner'
                            value={formData.emojis}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    emojis: e.currentTarget.value,
                                })
                            }
                            onFocus={() => {
                                setShowSmileyPicker(true);
                            }}
                            onBlur={handleEmojiesBlur}
                        />
                        <div
                            ref={emojiPickerRef}
                            className={cn(
                                'absolute right-full mr-4 top-1/2 -translate-y-1/2 shadow-2xl shadow-violet-900/40',
                                showSmileyPicker ? 'block' : 'hidden'
                            )}
                            onBlur={handleEmojiesBlur}
                        >
                            <EmojiPicker
                                onEmojiClick={(emojiData: EmojiClickData) => {
                                    setFormData((prev) => {
                                        return {
                                            ...prev,
                                            emojis:
                                                prev.emojis + emojiData.emoji,
                                        };
                                    });
                                }}
                                skinTonesDisabled={true}
                            />
                        </div>
                    </div>
                )}
                <AnswersForm
                    answers={formData.answers}
                    canDeletAnswer
                    canAddAnswer
                    onAddAnswer={handleAddAnswer}
                    onDeleteAnswer={handleDeleteAnswer}
                    onAnswersChange={handleAnswerChange}
                />
                <Textarea
                    label='Détail de la réponse'
                    value={formData.answerDetail}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            answerDetail: e.currentTarget.value,
                        })
                    }
                />
                <Select
                    label='Niveau de difficulté'
                    options={difficulties.map((difficulty) => {
                        return {
                            value: difficulty.level,
                            label: difficulty.name,
                            id: difficulty.level,
                        };
                    })}
                    value={formData.difficulty}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            difficulty: Number(e.currentTarget.value),
                        })
                    }
                />
            </div>

            <Button
                label='Ajouter le thème'
                type='submit'
            />
            {error.isError && (
                <div className='bg-pink-700 py-2 px-4 rounded-2xl'>
                    <p className='text-lg font-medium text-white text-center'>
                        {error.message}
                    </p>
                </div>
            )}
            {isValidate && (
                <div className='bg-teal-400 py-2 px-4 rounded-2xl'>
                    <p className='text-lg font-medium text-teal-950 text-center'>
                        Le thème a bien été ajouté !
                    </p>
                </div>
            )}
        </form>
    );
}
