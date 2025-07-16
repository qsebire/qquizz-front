'use client';
// A retirer !!!!!!!!!!!!!!!!!!!!!!!

import Button from '@/components/Button';
import GameSteps from '@/components/game/GameSteps';

export default function Question() {
    return (
        <div className='p-10 h-screen'>
            <GameSteps />
            <div className='absolute bottom-0 right-0'>
                <Button
                    label='Remove Store'
                    onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem('quiz-game-storage');
                        window.location.reload();
                    }}
                />
            </div>
        </div>
    );
}
