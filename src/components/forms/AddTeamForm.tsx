'use client';

import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Team } from '../../../types/game';
import Input from './elements/Input';
import { colorTeam } from '../../../data/shared/quizzModes';
import Button from '../Button';
import { useGameStore } from '../../../stores';

function ColorSelect({
    color: currentColor,
    onSelectColor,
}: {
    color: string;
    onSelectColor: (color: string) => void;
}) {
    const popoverRef = useRef<HTMLDivElement>(null);

    const [showColors, setShowColors] = useState(false);

    const handleSelect = (color: string) => {
        onSelectColor(color);
        setShowColors(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(document.activeElement)
            ) {
                setShowColors(false);
            }
        }, 100);
    };

    return (
        <div
            className='relative'
            onBlur={handleBlur}
        >
            <button
                className='aspect-square w-12 rounded-lg block border border-white cursor-pointer shadow-xl shadow-violet-900/40'
                style={{ background: currentColor }}
                onClick={() => setShowColors((prev) => !prev)}
                type='button'
            />
            {showColors && (
                <div
                    ref={popoverRef}
                    className='absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white p-2 z-10 rounded-xl grid grid-cols-4 gap-2 w-max'
                >
                    {colorTeam.map((color, index) => {
                        return (
                            <button
                                key={index}
                                className='aspect-square w-10 rounded-lg cursor-pointer'
                                style={{ background: color }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(color);
                                }}
                                type='button'
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function AddTeamForm() {
    const { addTeam } = useGameStore();

    const [error, setError] = useState<{
        isError: boolean;
        messages: string[];
    }>({ isError: false, messages: [] });
    const [team, setTeam] = useState<Team>({
        id: uuidv4(),
        name: '',
        score: 0,
        color: colorTeam[0],
    });

    const handleSubmit = () => {
        if (!team.id) {
            setError((prev) => {
                return {
                    isError: true,
                    messages: [
                        ...prev.messages,
                        'Une erreur est survenue, merci de recharger la page.',
                    ],
                };
            });
        }

        if (!team.name) {
            setError((prev) => {
                return {
                    isError: true,
                    messages: [
                        ...prev.messages,
                        "Vous devez renseigner un nom d'équipe.",
                    ],
                };
            });
        }

        if (!team.color) {
            setError((prev) => {
                return {
                    isError: true,
                    messages: [
                        ...prev.messages,
                        'Vous devez sélectionner une couleur.',
                    ],
                };
            });
        }

        addTeam(team);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex gap-4 items-end relative'>
                <Input
                    label="Nom de l'équipe"
                    value={team.name}
                    onChange={(e) =>
                        setTeam((prev) => {
                            return { ...prev, name: e.currentTarget.value };
                        })
                    }
                />
                <ColorSelect
                    color={team.color}
                    onSelectColor={(color) =>
                        setTeam((prev) => {
                            return { ...prev, color };
                        })
                    }
                />
                <Button
                    label='Ajouter'
                    onClick={handleSubmit}
                    type='submit'
                />
            </div>
            {error.isError && (
                <div className='bg-pink-700 py-2 px-4 rounded-2xl text-lg font-medium text-white text-center space-y-1'>
                    {error.messages.map((message, index) => {
                        return <p key={index}>{message}</p>;
                    })}
                </div>
            )}
        </form>
    );
}
