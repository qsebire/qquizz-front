import { THslArray } from '../../types';

const allowedGameModes = [
    {
        name: 'SPEED',
        label: 'Rapidité',
        description: (
            <p>
                L'équipe la plus rapide donne sa réponse. Sélectionnez l'équipe
                répondante. La réponse est alors révélée. Sélectionnez alors si
                elle a bien répondu, elle marquera un point. Si elle a eu faux,
                toutes les autres équipes marquent un point.
                <br />
                <br />À vous de définir comment mesurer la rapidité : buzzer,
                lever la main, crier un mot...
            </p>
        ),
    },
    {
        name: 'ALL_TEAMS',
        label: 'Tout le monde répond',
        description: (
            <p>
                À la fin du temps imparti, toutes les équipes doivent donner
                leur réponse. La réponse est alors révélée. Sélectionnez les
                équipes ayant trouvées la bonne réponse. Elles marqueront un
                point.
                <br />
                <br />
                Il est conseillé d’utiliser des ardoises, du papier ou un
                téléphone par équipe pour noter les réponses.
            </p>
        ),
    },
    {
        name: 'ONE_TEAM',
        label: 'Une question par équipe',
        description: (
            <p>
                Chaque équipe répond tour par tour à une question. À la fin du
                temps imparti, l'équipe concernée donne sa réponse. La réponse
                est alors révélée. Si elle trouve la bonne réponse, elle marque
                un point. On passe ensuite à l'équipe suivante.
            </p>
        ),
    },
];
const allowedAnswerModes = [
    {
        name: 'CASH',
        label: 'Réponse libre',
        description: <p>Pas de proposition de réponse.</p>,
    },
    {
        name: 'MCQ',
        label: 'QCM',
        description: (
            <p>Deux à quatres propositions. Une seule est correcte.</p>
        ),
    },
    {
        name: 'EITHER_ONE',
        label: "L'un ou l'autre",
        description: (
            <p>
                Inspiré des 12 Coups de Midi, à vous de choisir entre les
                propositions ou "l'autre".
            </p>
        ),
    },
    {
        name: 'TRUE_FALSE',
        label: 'Vrai ou Faux',
        description: (
            <p>
                Je ne vais pas vous faire l'affront de vous expliquer un vrai ou
                faux.
            </p>
        ),
    },
] as const;

const questionTypes = [
    { value: 'TEXT', label: 'Texte' },
    { value: 'IMAGE', label: 'Image' },
    // { value: 'VIDEO', label: 'Vidéo' },
    // { value: 'AUDIO', label: 'Audio' },
    { value: 'EMOJI', label: 'Émojies' },
];

const difficulties = [
    { level: 1, name: 'Facile' },
    { level: 2, name: 'Moyen' },
    { level: 3, name: 'Difficile' },
    { level: 4, name: 'Hardcore' },
];

const colorTeam: THslArray[] = [
    [84, 81, 44], // lime
    [142, 71, 45], // green
    [160, 84, 39], // emerald
    [173, 80, 40], // teal
    [215, 16, 47], // slate
    [189, 94, 43], // cyan
    [199, 89, 48], // sky
    [217, 91, 60], // blue
    [239, 84, 67], // indigo
    [333, 71, 51], // fuchsia
    [330, 81, 60], // pink
    [350, 89, 60], // rose
    [0, 84, 60], // red
    [25, 95, 53], // orange
    [32, 95, 44], // amber
    [48, 96, 53], // yellow
];

export {
    allowedGameModes,
    allowedAnswerModes,
    questionTypes,
    difficulties,
    colorTeam,
};
