import { TAnswerMode, TDifficultyLevel } from '../types/question';

const buildQuestionApiUrl = (params?: {
    nbr?: number;
    askedIds?: number[];
    themeId?: number;
    subThemeId?: number;
    answerModes?: TAnswerMode[];
    difficulties?: TDifficultyLevel[];
}) => {
    const url = new URL(
        '/question',
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    );

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                if (Array.isArray(value)) {
                    const arrayToString = value.join(',');
                    url.searchParams.append(key, String(arrayToString));
                } else {
                    url.searchParams.append(key, String(value));
                }
            }
        });
    }

    console.log(url.toString());

    return url.toString();
};

export { buildQuestionApiUrl };
