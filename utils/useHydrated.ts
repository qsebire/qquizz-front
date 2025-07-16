import { useEffect, useState } from 'react';
import { useGameStore } from '../stores';

export function useHydrated() {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const checkHydration = () => {
            if (useGameStore.persist?.hasHydrated?.()) {
                setIsHydrated(true);
            } else {
                // Fallback pour être sûr
                setTimeout(() => setIsHydrated(true), 100);
            }
        };

        checkHydration();
    }, []);

    return isHydrated;
}
