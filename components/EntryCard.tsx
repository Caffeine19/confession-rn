import { View, Text, ScrollView } from "react-native";

import { EntryWithCategory } from "../types/entry";

import { PhIcon, convertIconNameFromIconLabel } from "./PhIcon";

export interface EntryCardProps {
  date: string;
  entryList: EntryWithCategory[];
}

export const EntryCard: React.FC<EntryCardProps> = ({ date, entryList }) => {
  return (
    <View>
      <View className="space-y-2">
        <Text className="text-neutral-100 text-lg font-normal">{date}</Text>
        <View className="rounded-lg bg-neutral-900 px-3">
          {entryList.map((entry, index) => (
            <View
              className={
                "flex justify-between items-center flex-row  py-3 " +
                (index === entryList.length - 1
                  ? ""
                  : "border-neutral-800 border-b")
              }
              key={entry.id}
            >
              <View className="flex flex-row items-center gap-2">
                <View className="rounded-full bg-cookie-200 flex flex-row items-center justify-center p-1">
                  <PhIcon
                    name={convertIconNameFromIconLabel(
                      entry.category?.icon || ""
                    )}
                    color="#0a0a0a"
                    weight="fill"
                    size={24}
                  ></PhIcon>
                </View>
                <Text className="text-neutral-100 text-lg font-normal">
                  {entry.category?.label}
                </Text>
              </View>

              <Text
                className={
                  (entry.type === "output"
                    ? "text-guilty-400"
                    : "text-yokatta-300") +
                  " " +
                  "text-base font-normal"
                }
              >
                {(entry.type === "output" ? "-" : "+") +
                  (entry.amount / 100).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
