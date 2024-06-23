import { FC } from 'react';

type WheelOfNamesProps = {
    list: string[];
    size?: number;
    onClick?: boolean;
    minSpins?: number;
    maxSpins?: number;
    fps?: number;
    onComplete?: (winner: string) => void;
    colors?: string[];
    fontColor?: string;
    fontFamily?: string;
    fontSize?: number;
    backgroundColor?: string;
    pointerColor?: string;
    highlightColor?: string;
    tickSound?: string;
    winSound?: string;
    tickPlaybackRate?: number;
    winPlaybackRate?: number;
};

declare const WheelOfNames: FC<WheelOfNamesProps>;

export { WheelOfNames as default };
