'use client';

import { JSX, useEffect, useState } from 'react';
import { useGameStore } from '../../../stores';
import Checkbox from './elements/Checkbox';
import { TGameRules } from '../../../types/game';
import Input from './elements/Input';
import Select from './elements/Select';
import {
    allowedAnswerModes,
    difficulties,
    questionTypes,
} from '../../../data/shared/quizzModes';
import FieldContainer from './elements/FieldContainer';
import InfoButton from '../InfoButton';
import { TAllowedAnswerMode, TDifficultyLevel } from '../../../types/question';

type CheckbofFieldConfig<T> = {
    items: { value: T; label: string; description?: JSX.Element }[];
    currentValues: T[];
    onUpdate: (newValues: T[]) => void;
    errorMessage?: string;
    label: string;
};

function MultiCheckboxField<T extends string | number>({
    items,
    currentValues,
    onUpdate,
    errorMessage,
    label,
}: CheckbofFieldConfig<T>) {
    const [error, setError] = useState<string | undefined>(errorMessage);

    const handleToggle = (value: T) => {
        if (currentValues.includes(value)) {
            if (currentValues.length === 1) {
                setError('Au moins un élément doit être sélectionné.');
                return;
            }

            onUpdate(currentValues.filter((item) => item !== value));
        } else {
            onUpdate([...currentValues, value]);
        }
        setError(undefined);
    };

    return (
        <FieldContainer
            label={label}
            errorMessage={error}
        >
            <div className='flex items-center gap-4 flex-wrap'>
                {items.map((item) => {
                    return (
                        <div
                            className='flex items-start gap-1'
                            key={item.value}
                        >
                            <Checkbox
                                label={item.label}
                                isChecked={currentValues.includes(item.value)}
                                onClick={() => handleToggle(item.value)}
                            />
                            {item.description && (
                                <InfoButton info={item.description} />
                            )}
                        </div>
                    );
                })}
            </div>
        </FieldContainer>
    );
}

export default function GameRulesForm() {
    const { gameRules, setRules } = useGameStore();

    // useEffect(() => {
    //     setRulesStore(rules);
    //     console.log(gameRules);
    // }, [rules]);

    const optionsQuestionPerRound = [
        { value: 5, label: '5', id: 5 },
        { value: 10, label: '10', id: 10 },
        { value: 20, label: '20', id: 20 },
    ];

    const optionsTimePerQuestion = [
        { value: 30, label: '30 secondes', id: 30 },
        { value: 60, label: '1 minute', id: 60 },
        { value: 120, label: '2 minutes', id: 120 },
    ];

    const questionTypesConfig = {
        label: 'Types de questions',
        items: questionTypes.map((qt) => ({
            value: qt.value,
            label: qt.label,
        })),
        currentValues: gameRules.allowedTypes,
        onUpdate: (newValue: string[]) =>
            setRules({
                ...gameRules,
                allowedTypes: newValue,
            }),
    };

    const answerModesConfig = {
        label: 'Types de réponses',
        items: allowedAnswerModes.map((ad) => ({
            value: ad.name,
            label: ad.label,
            description: ad.description,
        })),
        currentValues: gameRules.allowedAnswerModes,
        onUpdate: (newValue: TAllowedAnswerMode[]) =>
            setRules({
                ...gameRules,
                allowedAnswerModes: newValue,
            }),
    };

    const difficultiesConfig = {
        label: 'Difficulté des réponses',
        items: difficulties.map((d) => ({
            value: d.level,
            label: d.name,
        })),
        currentValues: gameRules.allowedDifficulties,
        onUpdate: (newValue: TDifficultyLevel[]) =>
            setRules({
                ...gameRules,
                allowedDifficulties: newValue,
            }),
    };

    return (
        <div>
            <div className='space-y-4'>
                <Input
                    label='Nombre de tours'
                    type='number'
                    min={2}
                    value={gameRules.maxRounds}
                    onChange={(e) => {
                        const currentValue = parseInt(e.currentTarget.value);
                        if (!isNaN(currentValue)) {
                            setRules({ ...gameRules, maxRounds: currentValue });
                        }
                    }}
                />
                <Select
                    label='Questions par tour'
                    options={optionsQuestionPerRound}
                    value={gameRules.questionPerRound}
                    onChange={(e) => {
                        const currentValue = parseInt(e.currentTarget.value);
                        if (!isNaN(currentValue)) {
                            setRules({
                                ...gameRules,
                                questionPerRound: currentValue,
                            });
                        }
                    }}
                />
                <Select
                    label='Temps de réponse'
                    options={optionsTimePerQuestion}
                    value={gameRules.timePerQuestion}
                    onChange={(e) => {
                        const currentValue = parseInt(e.currentTarget.value);
                        if (!isNaN(currentValue)) {
                            setRules({
                                ...gameRules,
                                timePerQuestion: currentValue,
                            });
                        }
                    }}
                />
                <MultiCheckboxField {...questionTypesConfig} />
                <MultiCheckboxField {...answerModesConfig} />
                <MultiCheckboxField {...difficultiesConfig} />
            </div>
        </div>
    );
}
