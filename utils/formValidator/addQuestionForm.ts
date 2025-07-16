import emojiRegex from 'emoji-regex';
import { v4 as uuidv4 } from 'uuid';

import { difficulties, questionTypes } from '../../data/shared/quizzModes';
import {
    TAllowedAnswerMode,
    TAnswer,
    TQuestion,
    TTheme,
} from '../../types/question';

export type toggleAnswerModeType = (
    prevModes: TAllowedAnswerMode[],
    selectedMode: TAllowedAnswerMode
) => { error: boolean; modes: TAllowedAnswerMode[] };
export const toggleAnswerMode: toggleAnswerModeType = (
    prevModes,
    selectedMode
) => {
    // Is already in modes
    if (prevModes.includes(selectedMode)) {
        // Error if only one mode
        if (prevModes.length === 1) {
            return { error: true, modes: prevModes };
        }
        // Remove mode
        return {
            error: false,
            modes: prevModes.filter((mode) => mode !== selectedMode),
        };
    }

    // Add mode

    // TRUE_FALSE can't be with other modes
    if (selectedMode === 'TRUE_FALSE') {
        return { error: true, modes: ['TRUE_FALSE'] };
    }

    // Other case, remove TRUE_FALSE and add selected

    const modesWithoutTrueFalse = prevModes.filter(
        (mode) => mode !== 'TRUE_FALSE'
    );
    return {
        error: prevModes.includes('TRUE_FALSE') ? true : false,
        modes: modesWithoutTrueFalse.concat(selectedMode),
    };
};

export type manageAnswersByModeType = (
    currentAnswers: TAnswer[],
    currentModes: TAllowedAnswerMode[]
) => TAnswer[];
export const manageAnswersByMode: manageAnswersByModeType = (
    currentAnswers,
    currentModes
) => {
    // Case mode TRUE_FALSE
    if (currentModes.includes('TRUE_FALSE')) {
        return [
            { id: uuidv4(), text: 'Vrai', isCorrect: true },
            { id: uuidv4(), text: 'Faux', isCorrect: false },
        ];
    }

    // Case CASH is the only mode
    if (currentModes.length === 1 && currentModes.includes('CASH')) {
        return currentAnswers.filter((answer) => answer.isCorrect === true);
    }

    // Case currently only one answer but MCQ or EITHER_ONE is selected
    if (currentAnswers.length === 1) {
        if (currentModes.some((mode) => ['MCQ', 'EITHER_ONE'].includes(mode))) {
            return currentAnswers.concat({
                id: uuidv4(),
                text: '',
                isCorrect: false,
            });
        }
    }

    return currentAnswers;
};

export const addQuestionValidation = ({
    formData,
    themes,
}: {
    formData: TQuestion;
    themes: TTheme[];
}) => {
    const {
        question,
        type,
        theme,
        difficulty,
        mediaUrl,
        emojis,
        allowedAnswerModes,
        answers,
    } = formData;

    let resp: { isError: boolean; messages: string[] } = {
        isError: false,
        messages: [],
    };

    // ----- question
    if (question.length === 0) {
        resp.isError = true;
        resp.messages.push('Vous devez indiquer une question.');
    }

    // ----- type
    if (type.length === 0) {
        resp.isError = true;
        resp.messages.push('Vous devez renseigner un type de question.');
    }

    if (!questionTypes.some((allowedType) => allowedType.value === type)) {
        resp.isError = true;
        resp.messages.push("Le type de question sélectionné n'est pas valide.");
    }

    // ----- themeId
    if (!theme) {
        resp.isError = true;
        resp.messages.push('Un thème doit être sélectionné.');
    }

    if (!themes.some((allowedTheme) => allowedTheme.id === theme.id)) {
        resp.isError = true;
        resp.messages.push('Le thème sélectionné est invalide.');
    }

    // ----- difficulty
    if (!difficulty) {
        resp.isError = true;
        resp.messages.push('Un niveau de difficulté doit être sélectionné.');
    }

    if (
        !difficulties.some(
            (allowedDifficulty) => allowedDifficulty.level === difficulty
        )
    ) {
        resp.isError = true;
        resp.messages.push('La difficulté séectionnée est invalide.');
    }

    // ----- mediaUrl (IMAGE)
    if (type === 'IMAGE' && !mediaUrl) {
        if (!mediaUrl) {
            resp.isError = true;
            resp.messages.push('Vous devez ajouter une image.');
        } else {
            const urlImageRegex = new RegExp(
                '^https://res.cloudinary.com/dbrgpxdez/image/upload/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+.(?:jpg|png|webp)$'
            );
            if (!urlImageRegex.test(mediaUrl)) {
                resp.isError = true;
                resp.messages.push(
                    "L'URL de l'image est invalide. Merci de l'importer à nouveau."
                );
            }
        }
    }

    // ----- emojis
    if (type === 'EMOJI') {
        if (!emojis || emojis.length === 0) {
            resp.isError = true;
            resp.messages.push('Vous devez renseigner un ou des émojies.');
        } else {
            const regexEmoji = emojiRegex();
            if (regexEmoji.test(emojis)) {
                resp.isError = true;
                resp.messages.push(
                    'Le champ émojies ne doit contenir que des émojies valides.'
                );
            }
        }
    }

    // ----- allowedAnswerMode
    if (allowedAnswerModes.length === 0) {
        resp.isError = true;
        resp.messages.push(
            'Vous devez sélectionner au moins 1 mode de réponse.'
        );
    }

    if (
        allowedAnswerModes.includes('TRUE_FALSE') &&
        allowedAnswerModes.length > 1
    ) {
        resp.isError = true;
        resp.messages.push(
            'Le mode "Vrai ou Faux" ne peut pas être combiné avec un autre mode de réponse.'
        );
    }

    // ----- answers
    let allowedNbAnswers = { min: 2, max: 4 };
    if (
        allowedAnswerModes.length === 1 &&
        allowedAnswerModes.includes('CASH')
    ) {
        allowedNbAnswers = { min: 1, max: 1 };
    }
    if (
        answers.filter((answer) => answer.text !== '').length <
        allowedNbAnswers.min
    ) {
        resp.isError = true;
        resp.messages.push(
            `Vous devez au moins renseigner ${allowedNbAnswers.min} réponse${
                allowedNbAnswers.min > 1 ? 's' : ''
            }.`
        );
    }

    if (
        answers.filter((answer) => answer.text !== '').length >
        allowedNbAnswers.max
    ) {
        resp.isError = true;
        resp.messages.push(
            `Vous ne pouvez renseigner plus de ${allowedNbAnswers.max} réponse${
                allowedNbAnswers.max > 1 ? 's' : ''
            }.`
        );
    }

    const nbGoodAnswer = answers.filter(
        (answer) => answer.isCorrect === true
    ).length;
    if (nbGoodAnswer === 0) {
        resp.isError = true;
        resp.messages.push(`Vous devez avoir au moins une bonne réponse.`);
    }

    if (nbGoodAnswer > 1) {
        resp.isError = true;
        resp.messages.push(`une seule réponse peut être la bonne.`);
    }

    return resp;
};
