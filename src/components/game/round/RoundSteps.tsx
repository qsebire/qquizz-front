import { useGameStore } from '../../../../stores';
import RoundSelectTeam from './RoundSelectTeam';
import QuestionSteps from '../question/QuestionSteps';

export default function RoundSteps() {
    const { round } = useGameStore();

    switch (round.step) {
        case 'selectTeam':
            return <RoundSelectTeam />;
        case 'selectTheme':
        // return <Results />
        case 'questions':
            return <QuestionSteps />;
        // return <Results />
        case 'result':
        // return <Results />
    }
}
