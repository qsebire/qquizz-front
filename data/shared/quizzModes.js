const allowedGameModes = [
    {
        name: 'SPEED',
        label: 'Rapidité',
        description: (
            <p>
                L'équipe la plus rapide à répondre donne sa réponse en premier.
                <ul>
                    <li>
                        <strong>QCM :</strong> si elle trouve la bonne réponse,
                        elle marque un point. Sinon, les autres équipes peuvent
                        répondre à tour de rôle. Si aucune ne trouve, personne
                        ne marque.
                    </li>
                    <li>
                        <strong>Vrai ou Faux et Réponse libre :</strong> une
                        bonne réponse rapporte un point, une mauvaise en fait
                        perdre un.
                    </li>
                </ul>
                À vous de définir comment mesurer la rapidité : buzzer, lever la
                main, crier un mot, etc...
            </p>
        ),
    },
    {
        name: 'ALL_TEAMS',
        label: 'Tout le monde répond',
        description: (
            <p>
                À la fin du temps imparti, toutes les équipes doivent donner
                leur réponse. Celles qui trouvent la bonne réponse marquent un
                point.
                <ul>
                    <li>
                        <strong>QCM et Vrai ou Faux :</strong> à la fin du
                        chrono, sélectionnez l’équipe, puis sa réponse. Une fois
                        toutes les réponses sélectionnées, cliquez sur{' '}
                        <em>Valider</em>
                        pour afficher les résultats.
                    </li>
                    <li>
                        <strong>Réponse libre :</strong> les équipes annoncent
                        leur réponse à la fin du temps. La bonne réponse est
                        ensuite affichée, sélectionnez manuellement les équipes
                        qui ont répondu correctement.
                    </li>
                </ul>
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
                Chaque équipe répond à son tour à une question. Si elle trouve
                la bonne réponse, elle marque un point.
                <ul>
                    <li>
                        <strong>QCM et Vrai ou Faux :</strong> à la fin du
                        chrono, sélectionnez la réponse de l’équipe, puis
                        cliquez sur <em>Valider</em> pour afficher le résultat.
                    </li>
                    <li>
                        <strong>Réponse libre :</strong> l’équipe annonce sa
                        réponse à la fin du temps. Affichez ensuite la bonne
                        réponse, puis validez ou non la réponse donnée.
                    </li>
                </ul>
            </p>
        ),
    },
];
const allowedAnswerModes = [
    {
        name: 'MCQ',
        label: 'QCM',
        description: (
            <p>Deux à quatres propositions. Une seule est correcte.</p>
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
    {
        name: 'CASH',
        label: 'Réponse libre',
        description: (
            <p>
                Pas de propositions : les équipes écrivent ou donnent
                directement leur réponse. Une fois le temps écoulé, affichez la
                bonne réponse et sélectionnez les équipes qui ont bien répondu.
            </p>
        ),
    },
];
const questionTypes = ['TEXT', 'IMAGE', 'VIDEO', 'AUDIO', 'EMOJI'];

module.exports = { allowedGameModes, allowedAnswerModes, questionTypes };
