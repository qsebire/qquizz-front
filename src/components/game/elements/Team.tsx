import { cn } from '../../../../lib/cn';
import { TTeam as teamProps } from '../../../../types/game';
import { arrayToHslString, getHslShade } from '../../../../utils/hooks';

export default function Team({
    team,
    size = 'default',
}: {
    team: teamProps;
    size?: 'default' | 'lg';
}) {
    const color500 = getHslShade(team.color, 8);
    const color600 = getHslShade(team.color, -12);
    const color700 = getHslShade(team.color, -18);
    const color800 = getHslShade(team.color, -25);

    const styleSize = {
        default: 'py-2 px-6 text-2xl border-6',
        lg: 'py-3 px-8 text-3xl border-8',
    };

    return (
        <div className='relative'>
            <div
                style={{
                    color: color500,
                    background: color600,
                    boxShadow: `inset 0 3px 4px 2px ${color700}`,
                }}
                className={cn(
                    'rounded-lg font-black z-10 relative ',
                    styleSize[size]
                )}
            >
                <div className='relative'>
                    <p className='relative z-20 text-center whitespace-nowrap'>
                        {team.name}
                    </p>
                    <p
                        style={{
                            color: color800,
                            textShadow: `0 -1px 4px ${color800}`,
                        }}
                        className='absolute top-0.5 left-1/2 -translate-x-1/2 z-10 text-center whitespace-nowrap'
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
