export const drawEllipse = (
  context: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  fill: string,
) => {
  context.save();
  context.beginPath();
  context.translate(cx - rx, cy - ry);
  context.scale(rx, ry);
  context.arc(1, 1, 1, 0, 2 * Math.PI, false);
  context.fillStyle = fill;
  context.fill();
  context.closePath();
  context.restore();
};

export const drawPieSlice = (
  context: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  clockwise: boolean,
  style: string,
  fill: boolean,
) => {
  context.save();
  context.beginPath();
  context.moveTo(cx, cy);
  context.arc(
    cx,
    cy,
    radius,
    deg2Rad(startAngle),
    deg2Rad(endAngle),
    clockwise,
  );
  context.lineTo(cx, cy);
  if (fill) {
    context.fillStyle = style;
    context.fill();
  } else {
    context.strokeStyle = style;
    context.stroke();
  }
  context.restore();
};

export const drawSpike = (
  context: CanvasRenderingContext2D,
  angle: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  style: string,
) => {
  context.save();
  context.rotate(deg2Rad(angle));
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.fillStyle = style;
  context.closePath();
  context.fill();
  context.strokeStyle = "#000";
  // context.stroke();
  context.restore();
};

export const clearCanvasBlank = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
) => context.clearRect(0, 0, canvas.width, canvas.height);

export const deg2Rad = (degs: number) => (degs * Math.PI) / 180;

export const getRandom = () => Math.random();

export const getRandomRange = (min: number, max: number) =>
  min + max * getRandom();

export const getRandomRangeWhole = (min: number, max: number) =>
  Math.round(getRandomRange(min + 1, max - 1)) - 1;

export const getRandomizedList = <T>(arr: T[]) =>
  arr.sort(() => 0.5 * Math.random());

export const getSpinAmount = (min: number, max: number) => {
  return getRandomRangeWhole(360 * min, 360 * max);
};
