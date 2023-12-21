import React, { useEffect, useMemo } from "react";
import { View } from "react-native";

interface DividerProps {
  direction?: "vertical" | "horizontal";
  type?: "primary" | "secondary";
  color?: string;
}

const getDividerColor = (
  type: DividerProps["type"],
  color: DividerProps["color"]
): string => {
  if (color) return color;
  if (type === "primary") return "border-neutral-800";
  if (type === "secondary") return "border-neutral-600";
  return "";
};

const getDividerBorderDirection = (
  direction: DividerProps["direction"]
): string => {
  if (!direction || direction === "horizontal") return "border-b";
  if (direction === "vertical") return "border-l";
  return "";
};

export const Divider: React.FC<DividerProps> = (props) => {
  return (
    <View
      {...props}
      className={
        getDividerColor(props.type, props.color) +
        " " +
        getDividerBorderDirection(props.direction)
      }
    />
  );
};
