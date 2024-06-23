import { forwardRef, useRef, useImperativeHandle, useEffect, FC } from "react";
import {
  clearCanvasBlank,
  drawEllipse,
  deg2Rad,
  drawPieSlice,
  drawSpike,
  getSpinAmount,
} from "./utils";
import { WheelOfNamesProps } from "./WheelOfNames.types";
import "./WheelOfNames.css";

const COLORS = ["#3369e8", "#d50f25", "#eeb211", "#009925", "#000000"];

const WheelOfNames: FC<WheelOfNamesProps> = ({
  size = 300,
  list,
  minSpins = 1,
  maxSpins = 5,
  fps = 14,
  onComplete,
  colors = COLORS,
  fontColor = "#fff",
  fontFamily = "Arial",
  backgroundColor = "#fff",
  pointerColor = "#fff",
  highlightColor = "rgba(255,100,100,0.5)",
  fontSize = 20,
  tickSound,
  winSound,
  tickPlaybackRate = 4,
  winPlaybackRate = 1,
  onClick = true,
}) => {
  const wheelCanvasRef = useRef<HTMLCanvasElement>(null);
  const foreCanvasRef = useRef<HTMLCanvasElement>(null);
  const selectorCanvasRef = useRef<HTMLCanvasElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const appRadius = size / 2;
  const wheelRadius = appRadius - appRadius / 10;
  const sliceSize = 360 / list.length;
  let spinAngleEnd = -1;
  let spinAngle = -1;
  let spinRate = -1;
  let spinAlt = -1;
  let intervalHandle: NodeJS.Timeout | undefined;
  let currentAudio: string | undefined;

  const createWheel = () => {
    if (!wheelCanvasRef.current) return;
    const wheelCanvas = wheelCanvasRef.current;
    const wheelContext = wheelCanvasRef.current.getContext("2d");
    if (!wheelContext) return;
    clearCanvasBlank(wheelCanvas, wheelContext);
    drawEllipse(
      wheelContext,
      appRadius,
      appRadius,
      wheelRadius,
      wheelRadius,
      backgroundColor
    );
    let fillStyle: string;
    wheelContext.font = `${
      fontSize ?? sliceSize * (wheelRadius / appRadius)
    }pt ${fontFamily}`;
    wheelContext.textBaseline = "middle";
    for (let i = 0, j = 0; i < list.length; i++) {
      wheelContext.save();
      wheelContext.translate(appRadius, appRadius);
      wheelContext.rotate(deg2Rad(90 - sliceSize * i));
      wheelContext.translate(-appRadius, -appRadius);
      if (j == colors.length) {
        j = 0;
      }
      fillStyle = colors[j];
      j++;

      // ! this may can take away
      // if (i === list.length - 1) {
      //   let rand = fillStyle;

      //   fillStyle = rand;
      // }
      drawPieSlice(
        wheelContext,
        appRadius,
        appRadius,
        wheelRadius - wheelRadius / 50,
        180 - sliceSize / 2,
        180 + sliceSize / 2,
        false,
        fillStyle,
        true
      );
      wheelContext.save();
      wheelContext.fillStyle = fontColor;
      wheelContext.fillText(
        list[i],
        (appRadius - wheelRadius) * 2,
        appRadius,
        (appRadius - wheelRadius) * 6
      );
      wheelContext.restore();
      wheelContext.restore();
    }
  };

  const createPointer = () => {
    if (!foreCanvasRef.current) return;
    const foreCanvas = foreCanvasRef.current;
    const foreContext = foreCanvas.getContext("2d");
    if (!foreContext) return;
    clearCanvasBlank(foreCanvas, foreContext);
    const factor = 10;
    drawEllipse(
      foreContext,
      appRadius,
      appRadius,
      wheelRadius / factor,
      wheelRadius / factor,
      pointerColor
    );
    foreContext.save();
    foreContext.translate(appRadius, appRadius);
    foreContext.rotate(deg2Rad(180));
    const pegSize = appRadius / 20;
    drawSpike(
      foreContext,
      0,
      pegSize,
      pegSize,
      0,
      pegSize * 6,
      -pegSize,
      pegSize,
      pointerColor
    );
    foreContext.restore();
  };

  const drawStage = () => {
    if (!mainCanvasRef.current) return;
    const mainCanvas = mainCanvasRef.current;
    const mainContext = mainCanvas.getContext("2d");
    if (!mainContext) return;
    clearCanvasBlank(mainCanvas, mainContext);
    const half = size / 2;
    mainContext.save();
    mainContext.translate(half, half);
    mainContext.rotate(deg2Rad(spinAngle));
    mainContext.translate(-half, -half);
    if (!wheelCanvasRef.current) return;
    mainContext.drawImage(wheelCanvasRef.current, 0, 0);
    mainContext.restore();
    if (!selectorCanvasRef.current) return;
    mainContext.drawImage(selectorCanvasRef.current, 0, 0);
    if (!foreCanvasRef.current) return;
    mainContext.drawImage(foreCanvasRef.current, 0, 0);
  };

  const highlightWinner = (finishedAngle: number) => {
    finishedAngle = -finishedAngle;
    const angle = finishedAngle % 360;
    const rawResult = angle / sliceSize;
    let result = Math.round(rawResult);
    const i = result;
    if (result < 0) {
      result = result - (result + result);
    }

    if (result >= list.length) {
      result -= list.length;
    }

    const sliceOffset = sliceSize / 2 + i * sliceSize;
    const startAngle = 270 - (angle - sliceOffset);
    const endAngle = startAngle - sliceSize;
    const style = highlightColor;
    const clockwise = true;
    const fill = true;
    if (!selectorCanvasRef.current) return;
    const selectorCanvas = selectorCanvasRef.current;
    const selectorContext = selectorCanvas.getContext("2d");
    if (!selectorContext) return;
    selectorContext.lineWidth = wheelRadius / 20;
    selectorContext.setLineDash([selectorContext.lineWidth]);
    drawPieSlice(
      selectorContext,
      appRadius,
      appRadius,
      wheelRadius - wheelRadius / 50,
      startAngle,
      endAngle,
      clockwise,
      style,
      fill
    );
    createPointer();
    drawStage();
    if (audioRef.current && winSound) {
      audioRef.current.src = winSound;
      audioRef.current.playbackRate = winPlaybackRate;
      audioRef.current.play();
    }
    if (onComplete) {
      onComplete(list[result]);
    }
  };

  const animateWheel = () => {
    if (spinAngleEnd < 0) {
      spinAngleEnd = getSpinAmount(minSpins, maxSpins);
      spinAngle = 0;
      spinRate = 10;
      spinAlt = 0.15;
      intervalHandle = setInterval(() => animateWheel(), 1000 / fps);
      return;
    }

    if (spinAngle > spinAngleEnd - 360) {
      spinRate -= spinAlt;
      if (spinRate < 1) {
        spinRate = 1;
      }
    }

    const angle = (spinAngle % 360) + sliceSize / 2;
    const distanceFromPeg = Math.round(angle % sliceSize);
    if (distanceFromPeg < sliceSize && distanceFromPeg > sliceSize - 5) {
      if (audioRef.current && tickSound) {
        audioRef.current.src = tickSound;
        audioRef.current.playbackRate = tickPlaybackRate;
        audioRef.current.play();
      }
    }

    spinAngle += spinRate;

    if (spinAngle > spinAngleEnd) {
      clearInterval(intervalHandle);
      // * uncomment if needed
      // createPointer();
      drawStage();
      highlightWinner(spinAngle);
      spinAngleEnd = -1;
    } else {
      // * uncomment if needed
      // createPointer();
      drawStage();
    }
  };

  const startW = () => {
    if (spinAngle < spinAngleEnd) return;
    // createWheel();
    if (!selectorCanvasRef.current) return;
    const selectorCanvas = selectorCanvasRef.current;
    const selctorContext = selectorCanvas.getContext("2d");
    if (!selctorContext) return;
    clearCanvasBlank(selectorCanvas, selctorContext);
    animateWheel();
  };

  useEffect(() => {
    createWheel();
    createPointer();
    drawStage();
  }, [list, size, fontSize]);

  const displayNoneStyle = {
    display: "none",
  };

  return (
    <div className="canvas-container">
      <canvas
        width={size}
        height={size}
        ref={wheelCanvasRef}
        style={displayNoneStyle}
      />
      <canvas
        width={size}
        height={size}
        ref={foreCanvasRef}
        style={displayNoneStyle}
      />
      <canvas
        width={size}
        height={size}
        ref={selectorCanvasRef}
        style={displayNoneStyle}
      />
      <canvas
        width={size}
        height={size}
        ref={mainCanvasRef}
        style={{
          cursor: onClick ? "pointer" : "default",
          width: size,
          height: size,
        }}
        onClick={() => {
          if (onClick) startW();
        }}
      />
      {currentAudio ?? <audio src={currentAudio} ref={audioRef} />}
    </div>
  );
};

WheelOfNames.displayName = "WheelOfNames";

export default WheelOfNames;
