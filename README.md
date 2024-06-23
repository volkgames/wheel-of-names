# Wheel of Names

## Installation

Install via NPM:

In the same directory as your package.json file, create or edit an `.npmrc` file to include a line specifying GitHub Packages URL and the namespace where the package is hosted

```
@volkgames:registry=https://npm.pkg.github.com
```


```bash
npm i @volkgames/wheel-of-names@latest
```

## Usage

```typescript
import WheelOfNames from "@volkgames/wheel-of-names";

const Wheel = () => {
  return (
    <WheelOfNames 
      list={[
        "Pizza",
        "Hamburger",
        "Chicken",
        "Meat"
      ]} 
    />
  );
};
```

If you are using Next.js, make sure your component is a client component by adding `"use client"` at the top of your file.

## Props

| Prop            | Required | Description                                                                           |
|-----------------|----------|---------------------------------------------------------------------------------------|
| list            | true     | The names you want to include on the wheel. You need to provide at least 2 items.      |
| size            | false    | The size of the wheel. Default is 300.                                                 |
| onClick         | false    | If true, enables clicking on the wheel. Default is true.                               |
| minSpins        | false    | Minimum number of spins before the wheel stops. Default is 1.                          |
| maxSpins        | false    | Maximum number of spins before the wheel stops. Default is 5.                          |
| fps             | false    | Frames per second for the animation. Default is 14.                                    |
| onComplete      | false    | Callback function that receives the winning name as an argument.                       |
| colors          | false    | Array of colors for the wheel segments. Default is a predefined set of colors.         |
| fontColor       | false    | Color of the text on the wheel. Default is `#fff`.                                     |
| fontFamily      | false    | Font family of the text on the wheel. Default is `Arial`.                              |
| fontSize        | false    | Font size of the text on the wheel. Default is 20.                                     |
| backgroundColor | false    | Background color of the wheel. Default is `#fff`.                                      |
| pointerColor    | false    | Color of the pointer. Default is `#fff`.                                               |
| highlightColor  | false    | Color of the highlight on the wheel segments. Default is `rgba(255,100,100,0.5)`.      |
| tickSound       | false    | Sound played on each tick of the wheel.                                                |
| winSound        | false    | Sound played when the wheel stops on a winning segment.                                |
| tickPlaybackRate| false    | Playback rate of the tick sound. Default is 4.                                         |
| winPlaybackRate | false    | Playback rate of the win sound. Default is 1.                                          |

## Example

Here is a more comprehensive example of how to use the `WheelOfNames` component with additional props:

```typescript
import WheelOfNames from "@volkgames/wheel-of-names";

const Wheel = () => {
  const handleComplete = (winner: string) => {
    console.log(`The winner is: ${winner}`);
  };

  return (
    <WheelOfNames 
      list={["Pizza", "Hamburger", "Chicken", "Meat"]}
      size={400}
      minSpins={2}
      maxSpins={6}
      fps={20}
      onComplete={handleComplete}
      colors={["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]}
      fontColor="#000"
      fontFamily="Verdana"
      fontSize={24}
      backgroundColor="#EEE"
      pointerColor="#000"
      highlightColor="rgba(0,255,0,0.5)"
      tickSound="tick.mp3"
      winSound="win.mp3"
      tickPlaybackRate={3}
      winPlaybackRate={1.5}
      onClick={true}
    />
  );
};
```

# Acknowledgements

Inspired by [Wheel of Destiny](https://github.com/robgithub/wheelofdestiny)
