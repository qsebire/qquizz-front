'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@stackframe/stack';
import { v4 as uuidv4 } from 'uuid';

import Button from '../Button';
import Input from './elements/Input';
import Select from './elements/Select';
import Textarea from './elements/Textarea';
import UploadImage from './elements/UploadImage';
import AnswersForm from './AnswersForm';

import {
    allowedAnswerModes,
    difficulties,
    questionTypes,
} from '../../../data/shared/quizzModes';
import { URL_BACKEND } from '../../../data/general';
import { cn } from '../../../lib/cn';
import Checkbox from './elements/Checkbox';
import InfoButton from '../InfoButton';
import InputSuggestion from './elements/InputSuggestions';
import EmojiField from './elements/EmojiField';
import {
    addQuestionValidation,
    manageAnswersByMode,
    toggleAnswerMode,
} from '../../../utils/formValidator/addQuestionForm';
import Loader from '../Loader';
import {
    AllowedAnswerMode,
    Question,
    SubTheme,
    Theme,
} from '../../../types/question';

export default function AddQuestionForm() {
    const user = useUser();

    const defaultQuestionData: Question = {
        question: '',
        type: 'TEXT',
        theme: { id: 0, name: '', smiley: '' },
        subTheme: { id: undefined, name: '' },
        difficulty: 1,
        mediaUrl: undefined,
        emojis: undefined,
        allowedAnswerModes: ['CASH', 'MCQ', 'EITHER_ONE'],
        answers: [
            { id: uuidv4(), text: '', isCorrect: true },
            { id: uuidv4(), text: '', isCorrect: false },
        ],
        answerDetail: '',
        userId: user?.id,
    };

    const [error, setError] = useState<{
        isError: boolean;
        messages: string[];
    }>({ isError: false, messages: [] });
    const [isValidate, setIsValidate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [themes, setThemes] = useState<Theme[]>();
    const [subThemes, setSubThemes] = useState<SubTheme[]>();
    const [isNewSubTheme, setIsNewSubTheme] = useState(false);
    const [modesError, setModesError] = useState(false);
    const [formData, setFormData] = useState<Question>(defaultQuestionData);

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const respThemes = await fetch(`${URL_BACKEND}/theme/all`);
                const themes = await respThemes.json();
                const respSubThemes = await fetch(
                    `${URL_BACKEND}/sub-theme/all`
                );
                const subThemes = await respSubThemes.json();
                if (!respThemes.ok || !respSubThemes.ok) {
                    setError({
                        isError: true,
                        messages:
                            themes?.error ||
                            subThemes?.error ||
                            'Erreur serveur.',
                    });
                    setIsValidate(false);
                    return;
                }
                setThemes(themes);
                setSubThemes(subThemes);
                setFormData({
                    ...formData,
                    theme: themes[0],
                });
            } catch (error) {
                setError({
                    isError: true,
                    messages: ['Erreur lors de la requête.'],
                });
                setIsValidate(false);
            }
        };

        fetchThemes();
    }, []);

    // ---- Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        if (!themes) {
            setError({
                isError: true,
                messages: [
                    'Un problème est survenu. Merci de recharger la page.',
                ],
            });
            setIsValidate(false);
            setLoading(false);
            return;
        }

        const validation = addQuestionValidation({ formData, themes });
        if (validation.isError) {
            setError(validation);
            setIsValidate(false);
            setLoading(false);
            return;
        }

        const subTheme = formData.subTheme;
        let subThemeId = subTheme?.id;
        if (subTheme && !subThemeId && subTheme.name.length > 1) {
            try {
                const resp = await fetch(`${URL_BACKEND}/sub-theme/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: subTheme.name }),
                });
                const json = await resp.json();

                if (!resp.ok) {
                    setError({
                        isError: true,
                        messages: [json?.error || 'Erreur serveur.'],
                    });
                    setIsValidate(false);
                    setLoading(false);
                    return;
                }

                subThemeId = json.id;
            } catch (err) {
                setError({
                    isError: true,
                    messages: ['Erreur lors de la requête.'],
                });
                setIsValidate(false);
                setLoading(false);
                return;
            }
        }

        try {
            const { theme, subTheme, ...postData } = formData;
            const resp = await fetch(`${URL_BACKEND}/question/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    themeId: theme.id,
                    subThemeId,
                    ...postData,
                }),
            });
            const json = await resp.json();
            if (!resp.ok) {
                setError({
                    isError: true,
                    messages: [json?.error || 'Erreur serveur.'],
                });
                setIsValidate(false);
                setLoading(false);
                return;
            }

            // setFormData(defaultQuestionData);
            setError({ isError: false, messages: [] });
            setIsValidate(true);
            setLoading(false);
        } catch (err) {
            setError({
                isError: true,
                messages: ['Erreur lors de la requête.'],
            });
            setIsValidate(false);
            setLoading(false);
        }
    };

    // ---- Theme
    const handleTheme = (inputValue: string) => {
        const selectedTheme = themes?.find(
            (theme) => theme.id === Number(inputValue)
        );

        if (!selectedTheme) {
            alert('Une erreur est survenue, merci de recharger la page.');
            return;
        }

        setFormData({
            ...formData,
            theme: selectedTheme,
        });
    };

    // ---- Sub-theme
    const handleSubTheme = (inputValue: string) => {
        const existingSubTheme = subThemes?.find(
            (subTheme) => subTheme.name === inputValue
        );

        setFormData({
            ...formData,
            subTheme: { id: existingSubTheme?.id, name: inputValue },
        });

        if (inputValue.length > 0 && !existingSubTheme?.id) {
            setIsNewSubTheme(true);
            return;
        }

        setIsNewSubTheme(false);
    };

    // Manage answers
    let canAddAnswer = formData.answers.length < 4;
    let canDeletAnswer = formData.answers.length > 2;
    if (
        formData.allowedAnswerModes.includes('TRUE_FALSE') ||
        (formData.allowedAnswerModes.length === 1 &&
            formData.allowedAnswerModes.includes('CASH'))
    ) {
        canAddAnswer = false;
        canDeletAnswer = false;
    }

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

    // Manage modes and repercussions
    const handleAnswerMode = (name: AllowedAnswerMode) => {
        setFormData((prev) => {
            const respModes = toggleAnswerMode(prev.allowedAnswerModes, name);
            const newAnswers = manageAnswersByMode(
                prev.answers,
                respModes.modes
            );

            // Error in modes, callback UI
            if (respModes.error) {
                setModesError(true);
                setTimeout(() => {
                    setModesError(false);
                }, 500);
            }

            return {
                ...prev,
                allowedAnswerMode: respModes.modes,
                answers: newAnswers,
            };
        });
    };

    const answerModes = allowedAnswerModes.map((allowedAnswerMode) => {
        return (
            <div
                className='flex items-start gap-1'
                key={allowedAnswerMode.name}
            >
                <Checkbox
                    label={allowedAnswerMode.label}
                    isChecked={formData.allowedAnswerModes.includes(
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
            onSubmit={handleSubmit}
        >
            <div
                className={cn(
                    'w-full space-y-6',
                    loading ? 'opacity-60 pointer-events-none' : ''
                )}
            >
                <Select
                    label='Type de question'
                    options={questionTypes}
                    value={formData.type}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            type: e.currentTarget.value,
                            mediaUrl: undefined,
                            emojis: undefined,
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
                        value={formData.theme.id}
                        onChange={(e) => handleTheme(e.currentTarget.value)}
                    />
                )}
                {subThemes && (
                    <InputSuggestion
                        label='Sous-thème'
                        isOptional={true}
                        name='subTheme'
                        value={formData.subTheme?.name}
                        suggestions={subThemes.map((subTheme) => subTheme.name)}
                        onChange={(e) => handleSubTheme(e.currentTarget.value)}
                        errorMessage={
                            isNewSubTheme
                                ? `Le sous-thème "${formData.subTheme?.name}" n'éxiste pas. Il sera créé lors de la création de la question.`
                                : undefined
                        }
                    />
                )}
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
                    placeholder='Indiquez votre question ici'
                />
                {formData.type === 'IMAGE' && (
                    <UploadImage
                        label='Image'
                        imageUpload={formData.mediaUrl}
                        onUpload={(imageUrl) =>
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    mediaUrl: imageUrl,
                                };
                            })
                        }
                    />
                )}
                {['VIDEO', 'AUDIO'].includes(formData.type) && (
                    <Input
                        label={
                            formData.type === 'VIDEO'
                                ? 'URL de la vidéo'
                                : formData.type === 'AUDIO'
                                ? "URL de l'audio"
                                : 'URL du média'
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
                    <EmojiField
                        value={formData.emojis}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                emojis: e.currentTarget.value,
                            })
                        }
                        onEmojiClick={(emojiData) => {
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    emojis: prev.emojis + emojiData.emoji,
                                };
                            });
                        }}
                    />
                )}
                <div className='space-y-6'>
                    <div className='space-y-1'>
                        <p className='font-semibold text-2xl text-white'>
                            Mode(s) de réponse autorisé(s)
                        </p>
                        <ul
                            className={cn(
                                'text-white text-lg leading-tight space-y-1 list-disc pl-4',
                                modesError && 'text-pink-500'
                            )}
                        >
                            <li>
                                Lorsque la question sera posée, l'un des mode
                                coché sera aléatoirement sélectionné.
                                L'affichage des réponses sera automatiquement
                                adapté.
                            </li>
                            <li>Au moins un mode doit être sélectionné.</li>
                            <li>
                                Le mode <strong>"Vrai ou Faux"</strong> ne peut
                                être combiné à un autre mode.
                            </li>
                        </ul>
                    </div>
                    <div className='flex items-center gap-4 flex-wrap'>
                        {answerModes}
                    </div>
                </div>
                <div className='space-y-4 border-y border-white py-4'>
                    <div className='space-y-1'>
                        <p className='text-2xl w-full font-bold text-white'>
                            Réponses proposées
                        </p>
                        {formData.allowedAnswerModes.some((mode) =>
                            ['MCQ', 'EITHER_ONE'].includes(mode)
                        ) && (
                            <ul className='text-white text-lg leading-tight space-y-1 list-disc pl-4'>
                                {formData.allowedAnswerModes.includes(
                                    'MCQ'
                                ) && (
                                    <li>
                                        En mode <strong>"QCM"</strong> les
                                        réponses seront placées de manière
                                        aléatoire.
                                    </li>
                                )}
                                {formData.allowedAnswerModes.includes(
                                    'EITHER_ONE'
                                ) && (
                                    <li>
                                        En mode{' '}
                                        <strong>"L'un ou l'autre"</strong>, une
                                        réponse sera aléatoirement mise sous
                                        "l'autre".
                                    </li>
                                )}
                                <li>
                                    Vous pouvez proposer jusqu'à 4 propositions.
                                </li>
                            </ul>
                        )}
                    </div>
                    <AnswersForm
                        answers={formData.answers}
                        canDeletAnswer={canDeletAnswer}
                        canAddAnswer={canAddAnswer}
                        onAddAnswer={handleAddAnswer}
                        onDeleteAnswer={handleDeleteAnswer}
                        onAnswersChange={handleAnswerChange}
                    />
                </div>
                <Textarea
                    label='Explication de la bonne réponse'
                    value={formData.answerDetail}
                    isOptional={true}
                    description='Vous pouvez ajouter un texte pour détailler et exliquer la bonne réponse.'
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

            <div className='flex justify-center items-center gap-2'>
                <Button
                    label='Ajouter la question'
                    type='submit'
                    isClickable={!loading}
                />
                {loading && <Loader />}
            </div>
            {error.isError && (
                <div className='bg-pink-700 py-2 px-4 rounded-2xl text-lg font-medium text-white text-center space-y-1'>
                    {error.messages.map((message, index) => {
                        return <p key={index}>{message}</p>;
                    })}
                </div>
            )}
            {isValidate && (
                <div className='bg-teal-400 py-2 px-4 rounded-2xl'>
                    <p className='text-lg font-medium text-teal-950 text-center'>
                        La question a bien été ajoutée !
                    </p>
                </div>
            )}
        </form>
    );
}
