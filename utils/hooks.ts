import { THslArray } from '../types';

function getRandomElementInArr(arr: any[]) {
    if (arr.length === 0) {
        return undefined;
    }

    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function arraysEqual(a: any[], b: any[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// --- Colors

function arrayToHslString(hslArray: THslArray) {
    const [h, s, l] = hslArray; // Déstructuration du tableau
    return `hsl(${h}, ${s}%, ${l}%)`;
}

const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

// Fonction pour obtenir une teinte plus foncée (ou plus claire)
const getHslShade = (hslArray: THslArray, lightnessAdjustment: number) => {
    const [h, s, l] = hslArray; // Déstructuration pour une meilleure lisibilité
    const newLightness = clamp(l + lightnessAdjustment, 0, 100); // Ajuste et s'assure que la valeur est entre 0 et 100
    return arrayToHslString([h, s, newLightness]);
};

export {
    getRandomElementInArr,
    shuffleArray,
    arraysEqual,
    arrayToHslString,
    getHslShade,
};
