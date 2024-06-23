import WheelOfNames from "./WheelOfNames";

export type WheelOfNamesProps = {
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


export type TWheelOfNames = typeof WheelOfNames;
