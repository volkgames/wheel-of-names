import WheelOfNames from "../WheelOfNames";
import { Meta, StoryFn } from "@storybook/react";
import "./WhellOfNamesStory.css";

export default {
  title: "Wheel of names",
  component: WheelOfNames,
} as Meta<typeof WheelOfNames>;

const Template: StoryFn<typeof WheelOfNames> = (args) => (
  <WheelOfNames {...args} />
);

export const WheelTest = Template.bind({});
WheelTest.args = {
  size: 300,
  list: ["Louay", "Rahali", "Volk", "Games"],
  fontSize: 20,
  onClick: true,
};
