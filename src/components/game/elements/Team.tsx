import { TTeam as teamProps } from '../../../../types/game';
import { arrayToHslString, getHslShade } from '../../../../utils/hooks';

export default function Team({ team }: { team: teamProps }) {
    const color500 = getHslShade(team.color, 8);
    const color600 = getHslShade(team.color, -12);
    const color700 = getHslShade(team.color, -18);
    const color800 = getHslShade(team.color, -25);

    return (
        <div className='relative'>
            <div
                style={{
                    color: color500,
                    background: color600,
                    boxShadow: `inset 0 3px 4px 2px ${color700}`,
                }}
                className='py-2 px-6 rounded-lg text-2xl  font-black border-6 z-10 relative '
            >
                <div className='relative'>
                    <p className='relative z-20 '>{team.name}</p>
                    <p
                        style={{
                            color: color800,
                            textShadow: `0 -1px 4px ${color800}`,
                        }}
                        className='absolute top-0.5 left-0 z-10'
                    >
                        {team.name}
                    </p>
                </div>
            </div>
            <div
                style={{ background: color700 }}
                className='rounded-lg absolute top-1 left-0 w-full h-full  z-0 shadow-2xl shadow-violet-900/50'
            />
        </div>
    );
}
