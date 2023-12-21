import * as Icon from "phosphor-react-native";
import type { IconProps } from "phosphor-react-native";

import { Category } from "../types/category";

// 'ph-piggy-bank'=>'PiggyBank'
export const convertIconNameFromIconLabel = (str: Category["icon"]) => {
  return str
    .split("-")
    .slice(1)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("") as PhIconName;
};

type PhIconName = keyof typeof Icon;
const getIcon = (icon: PhIconProps) => (Icon as any)[icon.name]({ ...icon });

type PhIconProps = {
  name: PhIconName;
} & IconProps;

export const PhIcon: React.FC<PhIconProps> = (props) => getIcon(props);
